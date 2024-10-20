import { MetadataRoute } from "next"
import { getAllChapters } from "@/services/chapter"

import { env } from "@/env.mjs"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const chapters = await getAllChapters()
  return [
    {
      url: env.NEXT_PUBLIC_APP_URL,
    },
    ...chapters.map((c) => ({
      url: `${env.NEXT_PUBLIC_APP_URL}/${c.href}`,
    })),
  ]
}
