"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

type CareersClientProps = {
  positions: CareerPosition[]
}

export function CareersClient({ positions }: CareersClientProps) {
  const [activeCategory, setActiveCategory] = useState("Semua")
  const [selectedPositionId, setSelectedPositionId] = useState(positions[0]?.id ?? "")
  const [selectedPositionTitle, setSelectedPositionTitle] = useState(positions[0]?.title ?? "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const categories = useMemo(() => {
    const list = positions.map((position) => position.category)
    return ["Semua", ...Array.from(new Set(list))]
  }, [positions])

  const visiblePositions = useMemo(() => {
    if (activeCategory === "Semua") {
      return positions
    }
    return positions.filter((position) => position.category === activeCategory)
  }, [activeCategory, positions])

  const handleSelectPosition = (position: CareerPosition) => {
    setSelectedPositionId(position.id)
    setSelectedPositionTitle(position.title)
    const target = document.getElementById("career-apply-form")
    target?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")
    setIsSuccess(false)

    const formData = new FormData(event.currentTarget)
    formData.set("position_id", selectedPositionId)
    formData.set("position_title", selectedPositionTitle)

    const selectedPosition = positions.find((position) => position.id === selectedPositionId)
    if (selectedPosition?.category) {
      formData.set("category", selectedPosition.category)
    }
    if (selectedPosition?.location) {
      formData.set("location", selectedPosition.location)
    }

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || "Gagal mengirim lamaran.")
      }
      event.currentTarget.reset()
      setIsSuccess(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Gagal mengirim lamaran.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-20 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge>Karir</Badge>
        <h1 className="text-4xl font-bold">Bergabung dengan Tim Saga</h1>
        <p className="text-lg text-muted-foreground">
          Kami membuka pool kandidat untuk posisi penting di startup, termasuk co-founder dan founding engineers.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visiblePositions.map((position) => (
          <Card key={position.id} className="flex flex-col h-full">
            <CardHeader className="space-y-3">
              <CardTitle className="text-xl">{position.title}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{position.category}</Badge>
                {position.location ? <Badge variant="outline">{position.location}</Badge> : null}
                {position.type ? <Badge variant="outline">{position.type}</Badge> : null}
                {position.level ? <Badge variant="outline">{position.level}</Badge> : null}
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <p className="text-sm text-muted-foreground">{position.description}</p>
              {position.requirements?.length ? (
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  {position.requirements.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full" onClick={() => handleSelectPosition(position)}>
                Lamar Posisi Ini
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div id="career-apply-form" className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Lamaran</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="career-name">Nama Lengkap</label>
                  <Input id="career-name" name="name" required placeholder="Nama Anda" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="career-email">Email</label>
                  <Input id="career-email" name="email" type="email" required placeholder="nama@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="career-phone">Nomor WhatsApp</label>
                  <Input id="career-phone" name="phone" required placeholder="62812..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="career-position">Posisi</label>
                  <select
                    id="career-position"
                    name="position"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                    value={selectedPositionId}
                    onChange={(event) => {
                      const nextId = event.target.value
                      const nextPosition = positions.find((position) => position.id === nextId)
                      setSelectedPositionId(nextId)
                      setSelectedPositionTitle(nextPosition?.title ?? "")
                    }}
                  >
                    {positions.map((position) => (
                      <option key={position.id} value={position.id}>{position.title}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="career-linkedin">LinkedIn</label>
                  <Input id="career-linkedin" name="linkedin" placeholder="https://linkedin.com/in/username" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="career-portfolio">Portfolio</label>
                  <Input id="career-portfolio" name="portfolio" placeholder="https://portfolio.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium" htmlFor="career-note">Pesan Singkat</label>
                  <Textarea id="career-note" name="note" rows={4} placeholder="Ceritakan ringkas pengalaman dan motivasi Anda." />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium" htmlFor="career-cv">Upload CV (PDF/DOC)</label>
                  <Input id="career-cv" name="cv" type="file" accept=".pdf,.doc,.docx" required />
                </div>
              </div>
              {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}
              {isSuccess ? <p className="text-sm text-emerald-600">Lamaran berhasil terkirim. Kami akan menghubungi Anda.</p> : null}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Mengirim..." : "Kirim Lamaran"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
