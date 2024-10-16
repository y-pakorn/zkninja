import { createOpenAI } from "@ai-sdk/openai"

import { env } from "@/env.mjs"

export const provider = createOpenAI({
  baseURL: env.AI.ENDPOINT,
  apiKey: env.AI.API_KEY,
})

export const model = provider(env.AI.MODEL_NAME)
