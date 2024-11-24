import { createOpenAI } from "@ai-sdk/openai"

import { env } from "@/env.mjs"

export const provider = createOpenAI({
  baseURL: env.AI.ENDPOINT,
  apiKey: env.AI.API_KEY,
  headers: {
    "HTTP-Referer": env.NEXT_PUBLIC_APP_URL,
    "X-Title": "zk.ninja",
  }
})

export const model = provider(env.AI.MODEL_NAME)
