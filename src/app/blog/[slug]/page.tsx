import { getSinglePost } from "@/lib/ghost"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

// Force dynamic rendering for this page since we're fetching data
export const dynamic = "force-dynamic"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getSinglePost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container py-20 max-w-4xl">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Blog
        </Link>
      </Button>

      <div className="space-y-4 mb-8 text-center">
        {post.primary_tag && (
            <Badge variant="secondary">{post.primary_tag.name}</Badge>
        )}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
             <span>{new Date(post.published_at || "").toLocaleDateString("id-ID", { dateStyle: "long" })}</span>
             {post.reading_time && <span>• {post.reading_time} min read</span>}
        </div>
      </div>

      {post.feature_image && (
        <div className="aspect-video relative rounded-xl overflow-hidden mb-12 border">
            <img 
                src={post.feature_image} 
                alt={post.title} 
                className="object-cover w-full h-full"
            />
        </div>
      )}

      <div 
        className="prose dark:prose-invert max-w-none prose-lg"
        dangerouslySetInnerHTML={{ __html: post.html || "" }} 
      />
    </article>
  )
}
