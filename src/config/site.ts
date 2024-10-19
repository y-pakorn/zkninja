import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "ZK Ninja",
  author: "@yyyoisha, @jernkun, @yoyoismee",
  description:
    "Next generation of ZK education platform. Learn ZK with fun and interactive way.",
  keywords: [
    "ZK",
    "Zero Knowledge",
    "ZK Education",
    "Cryptography",
    "Cryptography Education",
    "ZK Learning",
    "Cryptography Learning",
    "ZK Ninja",
    "ZK Education Platform",
    "Cryptography Education Platform",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
  },
  links: {
    github: "https://github.com/y-pakorn/zk.ninja",
  },
}
