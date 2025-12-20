import { getPosts } from "@/lib/ghost"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const revalidate = 3600 // 1 hour

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container py-20">
      <div className="text-center mb-12">
        <Badge className="mb-4">Blog & Artikel</Badge>
        <h1 className="text-4xl font-bold mb-4">Wawasan Terbaru</h1>
        <p className="text-muted-foreground text-lg">Tips dan informasi seputar manajemen lingkungan.</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
           <p className="text-muted-foreground">Belum ada artikel.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Card key={post.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
              {post.feature_image && (
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={post.feature_image} 
                    alt={post.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                 <Button variant="outline" className="w-full" asChild>
                   <Link href={`/blog/${post.slug}`}>Baca Selengkapnya</Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <div className="text-center mt-12">
         <Button asChild>
             <Link href="/">Kembali ke Beranda</Link>
         </Button>
      </div>
    </div>
  )
}
