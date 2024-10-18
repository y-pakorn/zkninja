"use server"

import { streamText } from "ai"
import { createStreamableValue } from "ai/rsc"
import _ from "lodash"

import { JUDGE_PROMPT, QUESTION_PROMPT } from "@/config/prompt"

import { model } from "./ai"
import { getChapter } from "./chapter"

type StreamQuizResponse = {
  delta: string
}

export const streamQuizResult = async (
  id: string,
  question: string,
  answer: string,
  config?: {
    context?: string
  }
) => {
  const stream = createStreamableValue<StreamQuizResponse>()
  const chapter = await getChapter(id)

  if (!chapter) {
    throw new Error("Chapter not found")
  }

  ;(async () => {
    try {
      const { fullStream } = await streamText({
        model,
        prompt: JUDGE_PROMPT.replaceAll("{reference_content}", chapter.content)
          .replaceAll("{question}", question)
          .replaceAll("{answer}", answer)
          .replaceAll("{context}", config?.context || ""),
        temperature: 0.9,
        topP: 0.95,
        frequencyPenalty: 0,
        presencePenalty: 0.1,
      })

      for await (const detail of fullStream) {
        if (detail.type === "text-delta") {
          stream.update({
            delta: detail.textDelta,
          })
        }
      }
    } catch (e) {
      throw e
    } finally {
      stream.done()
    }
  })()

  return {
    stream: stream.value,
  }
}

export const streamRandomQuizQuestion = async (
  id: string,
  difficulty: string,
  config?: {
    context?: string
  }
) => {
  const stream = createStreamableValue<StreamQuizResponse>()
  const chapter = await getChapter(id)

  if (!chapter) {
    throw new Error("Chapter not found")
  }

  ;(async () => {
    try {
      const { fullStream } = await streamText({
        model,
        prompt: QUESTION_PROMPT.replaceAll(
          "{reference_content}",
          chapter.content
        )
          .replaceAll("{difficulty}", difficulty)
          .replaceAll("{context}", config?.context || ""),
        temperature: 0.9,
        topP: 0.95,
        frequencyPenalty: 0,
        presencePenalty: 0.1,
      })

      for await (const detail of fullStream) {
        if (detail.type === "text-delta") {
          stream.update({
            delta: detail.textDelta,
          })
        }
      }
    } catch (e) {
      throw e
    } finally {
      stream.done()
    }
  })()

  return {
    stream: stream.value,
  }
}
