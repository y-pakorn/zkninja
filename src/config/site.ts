import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "ZK Ninja",
  author: "@yyyoisha, @jernkun, @yoyoismee",
  description:
    "Next generation of ZK education platform. Learn ZK with fun and interactive way.",
  keywords: ["ZK", "Zero Knowledge", "ZK Education"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
  },
  links: {
    github: "https://github.com/y-pakorn/zkninja",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
