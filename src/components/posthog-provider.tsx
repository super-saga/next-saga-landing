"use client"

import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com"

if (typeof window !== "undefined" && posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: true,
  })
}

type PostHogProviderProps = {
  children: React.ReactNode
}

export function PostHogProviderClient({ children }: PostHogProviderProps) {
  if (!posthogKey) {
    return <>{children}</>
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
