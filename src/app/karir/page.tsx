import { CareersClient } from "@/components/careers-client"
import { supabaseAdmin } from "@/lib/supabase-admin"

type CareerPosition = {
  id: string
  slug?: string | null
  title: string
  category: string
  location?: string | null
  type?: string | null
  level?: string | null
  description?: string | null
  requirements?: string[]
}

const normalizeRequirements = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === "string") {
    return value.split("\n").map((item) => item.trim()).filter(Boolean)
  }
  return []
}

const defaultPositions: CareerPosition[] = [
  {
    id: "cofounder-tech",
    title: "Co-Founder - Teknologi",
    category: "Tech",
    location: "Remote / Indonesia",
    type: "Founder",
    level: "Senior",
    description: "Memimpin arah teknologi, arsitektur, dan delivery produk.",
    requirements: ["Pengalaman membangun produk digital", "Leadership teknis kuat", "Mampu scaling tim engineering"],
  },
  {
    id: "cofounder-growth",
    title: "Co-Founder - Growth & Go-To-Market",
    category: "Business",
    location: "Remote / Indonesia",
    type: "Founder",
    level: "Senior",
    description: "Menjadi penggerak strategi pertumbuhan, akuisisi, dan revenue.",
    requirements: ["Pengalaman growth di startup", "Penguasaan funnel acquisition", "Kemampuan negosiasi B2B"],
  },
  {
    id: "cofounder-ops",
    title: "Co-Founder - Operations",
    category: "Operations",
    location: "Remote / Indonesia",
    type: "Founder",
    level: "Senior",
    description: "Membangun fondasi operasional, people, dan legal.",
    requirements: ["Pengalaman scaling operasi", "Pemahaman legal & compliance", "Strong execution"],
  },
  {
    id: "founding-engineer-fullstack",
    title: "Founding Engineer - Fullstack",
    category: "Tech",
    location: "Remote / Indonesia",
    type: "Full Time",
    level: "Senior",
    description: "Membangun platform end-to-end bersama tim inti.",
    requirements: ["React & Node/Go", "Shipping produk cepat", "Sense of ownership tinggi"],
  },
  {
    id: "founding-engineer-mobile",
    title: "Founding Engineer - Mobile",
    category: "Tech",
    location: "Remote / Indonesia",
    type: "Full Time",
    level: "Senior",
    description: "Membangun aplikasi mobile untuk komunitas dan warga.",
    requirements: ["React Native/Flutter", "Performance minded", "Pengalaman merilis app ke store"],
  },
  {
    id: "founding-engineer-data",
    title: "Founding Engineer - Data & Analytics",
    category: "Data",
    location: "Remote / Indonesia",
    type: "Full Time",
    level: "Senior",
    description: "Membangun pipeline data dan insight untuk produk.",
    requirements: ["SQL & data modeling", "ETL dan analytics", "Pengalaman dashboard produk"],
  },
  {
    id: "product-lead",
    title: "Product Lead",
    category: "Product",
    location: "Remote / Indonesia",
    type: "Full Time",
    level: "Lead",
    description: "Mengelola roadmap produk dan riset pengguna.",
    requirements: ["Pengalaman product discovery", "Mampu membuat PRD", "Kolaborasi lintas tim"],
  },
  {
    id: "growth-marketing",
    title: "Growth Marketing Lead",
    category: "Marketing",
    location: "Remote / Indonesia",
    type: "Full Time",
    level: "Lead",
    description: "Meningkatkan awareness dan pipeline demand.",
    requirements: ["Performance marketing", "Eksperimen growth", "Pengalaman brand building"],
  },
  {
    id: "community-partnership",
    title: "Community & Partnership Lead",
    category: "Business",
    location: "Remote / Indonesia",
    type: "Full Time",
    level: "Senior",
    description: "Membangun relasi dengan komunitas, pengurus, dan mitra strategis.",
    requirements: ["Kemampuan partnership", "Komunikasi publik", "Pengalaman komunitas"],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    category: "Design",
    location: "Remote / Indonesia",
    type: "Full Time",
    level: "Senior",
    description: "Merancang pengalaman pengguna yang jelas dan efisien.",
    requirements: ["Figma expert", "Design system", "Research & prototyping"],
  },
  {
    id: "customer-success",
    title: "Customer Success Specialist",
    category: "Operations",
    location: "Remote / Indonesia",
    type: "Full Time",
    level: "Mid",
    description: "Membantu onboarding dan menjaga kepuasan pelanggan.",
    requirements: ["Komunikasi kuat", "Problem solving", "Pengalaman CS/AM"],
  },
]

async function fetchPositions(): Promise<CareerPosition[]> {
  if (!supabaseAdmin) {
    return defaultPositions
  }

  const { data, error } = await supabaseAdmin
    .from("career_positions")
    .select("id,slug,title,category,location,type,level,description,requirements,is_open,order_index")
    .eq("is_open", true)
    .order("order_index", { ascending: true })

  if (error || !data || data.length === 0) {
    return defaultPositions
  }

  return data.map((item: any) => ({
    id: item.id,
    slug: item.slug ?? null,
    title: item.title,
    category: item.category,
    location: item.location ?? null,
    type: item.type ?? null,
    level: item.level ?? null,
    description: item.description ?? null,
    requirements: normalizeRequirements(item.requirements),
  }))
}

export default async function KarirPage() {
  const positions = await fetchPositions()

  return <CareersClient positions={positions} />
}
