import { notFound } from "next/navigation"
import { features } from "@/lib/features"
import { Metadata } from "next"
import { FeatureDetail } from "./feature-detail"

export function generateStaticParams() {
  return features.map((feature) => ({
    slug: feature.slug,
  }))
}

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params
  const feature = features.find((f) => f.slug === slug)
  
  if (!feature) {
    return {
      title: "Feature Not Found",
    }
  }

  return {
    title: `${feature.title} - Sahabat Warga`,
    description: feature.description,
  }
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feature = features.find((f) => f.slug === slug)

  if (!feature) {
    notFound()
  }

  const { icon: Icon, ...featureData } = feature

  return <FeatureDetail feature={featureData} icon={<Icon className="w-12 h-12 md:w-16 md:h-16" />} />
}
