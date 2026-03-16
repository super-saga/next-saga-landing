import { supabaseAdmin, supabaseStorageBucket } from "@/lib/supabase-admin"

export const runtime = "nodejs"

const normalizeString = (value: FormDataEntryValue | null) => {
  if (!value || typeof value !== "string") {
    return ""
  }
  return value.trim()
}

const sanitizeFileName = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, "-")

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return new Response(JSON.stringify({ error: "Supabase not configured" }), { status: 500 })
  }

  const formData = await request.formData()
  const name = normalizeString(formData.get("name"))
  const email = normalizeString(formData.get("email"))
  const phone = normalizeString(formData.get("phone"))
  const positionId = normalizeString(formData.get("position_id"))
  const positionTitle = normalizeString(formData.get("position_title"))
  const category = normalizeString(formData.get("category"))
  const location = normalizeString(formData.get("location"))
  const linkedin = normalizeString(formData.get("linkedin"))
  const portfolio = normalizeString(formData.get("portfolio"))
  const note = normalizeString(formData.get("note"))
  const file = formData.get("cv")

  if (!name || !email || !phone || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
  }

  const safeFileName = sanitizeFileName(file.name || "cv.pdf")
  const path = `applications/${Date.now()}-${safeFileName}`
  const fileBuffer = Buffer.from(await file.arrayBuffer())

  const { error: uploadError } = await supabaseAdmin.storage
    .from(supabaseStorageBucket)
    .upload(path, fileBuffer, {
      contentType: file.type || "application/pdf",
      upsert: false,
    })

  if (uploadError) {
    return new Response(JSON.stringify({ error: uploadError.message }), { status: 500 })
  }

  const { data: publicUrlData } = supabaseAdmin.storage
    .from(supabaseStorageBucket)
    .getPublicUrl(path)

  const { error: insertError } = await supabaseAdmin
    .from("career_applications")
    .insert({
      name,
      email,
      phone,
      position_id: positionId || null,
      position_title: positionTitle || null,
      category: category || null,
      location: location || null,
      linkedin: linkedin || null,
      portfolio: portfolio || null,
      note: note || null,
      cv_path: path,
      cv_url: publicUrlData?.publicUrl ?? null,
      source: "landing",
      status: "new",
    })

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
