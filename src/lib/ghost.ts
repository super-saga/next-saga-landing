import GhostContentAPI from "@tryghost/content-api"

export const ghost = new GhostContentAPI({
  url: process.env.GHOST_API_URL || "https://demo.ghost.io",
  key: process.env.GHOST_CONTENT_API_KEY || "22444f78447824223cefc48062",
  version: "v5.0",
})

export async function getPosts() {
  try {
    return await ghost.posts.browse({
      limit: 5,
      include: ["tags", "authors"],
    })
  } catch (error) {
    console.error("Ghost API Error:", error)
    return []
  }
}

export async function getSinglePost(slug: string) {
  try {
    return await ghost.posts.read({
      slug,
    }, {
        include: ["tags", "authors"]
    })
  } catch (error) {
    console.error("Ghost API Error:", error)
    return null
  }
}
