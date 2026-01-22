"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Share2, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const socialMedia = [
  {
    name: "Facebook",
    icon: (props: any) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 4.16v1.957h3.696l-.259 3.667h-3.437v7.98H9.101Z" />
      </svg>
    ),
    className: "hover:bg-[#1877F2] hover:text-white",
    shareUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "X (Twitter)",
    icon: (props: any) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
    className: "hover:bg-black hover:text-white",
    shareUrl: (url: string, text: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    name: "WhatsApp",
    icon: (props: any) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
    className: "hover:bg-[#25D366] hover:text-white",
    shareUrl: (url: string, text: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
  },
  {
    name: "Threads",
    icon: (props: any) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.186 24c6.353 0 11.666-5.064 11.666-11.458 0-5.833-4.526-10.749-10.236-11.332C13.25.32 12.75 0 12.003 0 5.4 0 .003 5.214.003 11.832c0 3.328 1.418 6.326 3.69 8.396.223.203.57.175.761-.061.19-.236.166-.583-.056-.791-2.022-1.895-3.29-4.636-3.29-7.544 0-5.992 4.908-10.722 10.89-10.722 5.624 0 10.197 4.545 10.197 10.144 0 4.218-2.613 7.85-6.383 9.382-1.28.52-2.68.791-4.137.791-2.924 0-5.584-1.187-7.464-3.116-.234-.24-.224-.633.022-.86.246-.226.634-.213.864.024 1.636 1.68 3.95 2.712 6.578 2.712 1.252 0 2.455-.233 3.555-.676 3.16-1.285 5.35-4.327 5.35-7.857 0-4.64-3.79-8.406-8.45-8.406-4.793 0-8.683 3.888-8.683 8.68 0 4.12 2.92 7.558 6.814 8.416.328.073.535.4.462.728-.073.329-.4.536-.729.463-4.394-.968-7.652-4.858-7.652-9.607 0-5.405 4.495-9.785 10.09-9.785 5.485 0 9.775 4.382 9.775 9.788 0 3.815-2.188 7.152-5.4 8.795-1.047.535-2.186.815-3.37.815-1.558 0-2.934-.482-4.043-1.353-.257-.202-.303-.578-.102-.835.202-.257.579-.303.836-.102.854.67 1.916 1.04 3.064 1.04 1.455 0 2.784-.52 3.836-1.42.253-.217.27-.6.04-.841-.23-.242-.613-.258-.853-.04-1.118.966-2.58 1.545-4.173 1.545-3.352 0-6.075-2.723-6.075-6.075s2.723-6.075 6.075-6.075c3.35 0 6.075 2.723 6.075 6.075 0 2.122-1.096 4.018-2.78 5.127-.27.178-.348.543-.17.813.177.27.542.348.812.17 2.053-1.352 3.243-3.665 3.243-6.11 0-4.01-3.265-7.275-7.275-7.275-4.01 0-7.275 3.265-7.275 7.275s3.265 7.275 7.275 7.275c1.618 0 3.12-.53 4.346-1.436.264-.195.636-.14.832.124.195.264.14.636-.125.831Z" />
      </svg>
    ),
    className: "hover:bg-black hover:text-white",
    shareUrl: (url: string, text: string) => `https://www.threads.net/intent/post?text=${encodeURIComponent(text + " " + url)}`,
  },
]

export function ShareDialog() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const shareText = "Coba Sahabat Warga, aplikasi manajemen lingkungan RT/RW modern! 🚀"

  const handleShare = (network: typeof socialMedia[0]) => {
    const url = window.location.href
    const shareUrl = network.shareUrl(url, shareText)
    window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer")
    // Keep dialog open to allow sharing to other platforms
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setOpen(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-primary/20 text-primary hover:bg-primary/10">
          <Share2 className="w-4 h-4" />
          <span className="sr-only">Bagikan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bagikan Sahabat Warga</DialogTitle>
          <DialogDescription>
            Ajak teman dan kolega untuk merasakan kemudahan manajemen lingkungan digital.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {socialMedia.map((network) => (
            <Button
              key={network.name}
              variant="outline"
              className={cn("h-auto py-4 flex flex-col items-center gap-2 transition-colors border-muted-foreground/20", network.className)}
              onClick={() => handleShare(network)}
            >
              <network.icon className="w-8 h-8" />
              <span className="text-sm font-medium">{network.name}</span>
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Button 
                variant="secondary" 
                size="lg" 
                className="w-full gap-2"
                onClick={handleCopy}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Tersalin!" : "Salin Link"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
