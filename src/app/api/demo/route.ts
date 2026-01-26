import { NextResponse } from "next/server"
import { createCalcomBooking, createCalendarEvent } from "@/lib/calendar"
import { sendDemoRequestEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, date, message, tier } = body

    if (!name || !email || !date) {
      return NextResponse.json(
        { error: "Name, email, and date are required" },
        { status: 400 }
      )
    }

    // Parallel execution for speed
    await Promise.all([
      createCalcomBooking({
        name,
        email,
        phone,
        company,
        date,
        message,
        tier,
      }),
      sendDemoRequestEmail({
        name,
        email,
        phone: phone || "-",
        company: company || "-",
        date,
        message: message || "-",
      }),
    ])

    return NextResponse.json({ success: true, message: "Demo request received" })
  } catch (error) {
    console.error("Demo API Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
