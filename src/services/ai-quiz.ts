"use server"

import { streamText } from "ai"
import { createStreamableValue } from "ai/rsc"

import { JUDGE_PROMPT } from "@/config/prompt"

import { model } from "./ai"
import { getChapter, getQuizes } from "./chapter"

type StreamQuizResponse = {
  delta: string
}

export const streamQuizResult = async (
  id: string,
  quizId: string,
  answer: string
) => {
  const stream = createStreamableValue<StreamQuizResponse>()
  const chapter = await getChapter(id)

  if (!chapter) {
    throw new Error("Chapter not found")
  }

  const quiz = await getQuizes(id).then((quizes) => quizes[quizId])

  if (!quiz) {
    throw new Error("Quiz not found")
  }

  ;(async () => {
    try {
      const { fullStream } = await streamText({
        model,
        prompt: JUDGE_PROMPT.replaceAll("{reference_content}", chapter.content)
          .replaceAll("{question}", quiz.question)
          .replaceAll("{answer}", answer),
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
