import { getSinglePost } from "@/lib/ghost"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import { cn } from "@/lib/utils"

// Force dynamic rendering for this page since we're fetching data
export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getSinglePost(slug)

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
    }
  }

  const ogImage = post.feature_image || "/assets/images/web-preview.png"

  return {
    title: post.title,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getSinglePost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container py-20 max-w-4xl">
      <Link 
        href="/blog" 
        className={cn(buttonVariants({ variant: "ghost" }), "mb-8 pl-0 hover:pl-2 transition-all")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Blog
      </Link>

      <div className="space-y-4 mb-8 text-center">
        {post.primary_tag?.name && (
            <Badge variant="secondary">{post.primary_tag.name}</Badge>
        )}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
             {post.published_at && (
               <span>
                 {new Date(post.published_at).toLocaleDateString("id-ID", { 
                   dateStyle: "long",
                   timeZone: "Asia/Jakarta"
                 })}
               </span>
             )}
             {post.reading_time ? <span>• {post.reading_time} min read</span> : null}
        </div>
      </div>

      {post.feature_image && (
        <div className="aspect-video relative rounded-xl overflow-hidden mb-12 border">
            <img 
                src={post.feature_image} 
                alt={post.title || "Blog Image"} 
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
