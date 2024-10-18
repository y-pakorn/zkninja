"use server"

import { streamText } from "ai"
import { createStreamableValue } from "ai/rsc"
import _ from "lodash"

import { JUDGE_PROMPT, QUESTION_PROMPT } from "@/config/prompt"

import { model } from "./ai"
import { getChapter, getQuizes } from "./chapter"

type StreamQuizResponse = {
  delta: string
}

export const streamQuizResult = async (
  id: string,
  config:
    | {
        question: string
        context?: string
      }
    | string,
  answer: string
) => {
  const stream = createStreamableValue<StreamQuizResponse>()
  const chapter = await getChapter(id)

  if (!chapter) {
    throw new Error("Chapter not found")
  }

  const quiz = _.isString(config)
    ? await getQuizes(config).then((q) => {
        const quiz = q[config]
        if (!quiz || quiz.kind !== "open-ended")
          throw new Error("Quiz not found")
        return quiz
      })
    : config

  ;(async () => {
    try {
      const { fullStream } = await streamText({
        model,
        prompt: JUDGE_PROMPT.replaceAll("{reference_content}", chapter.content)
          .replaceAll("{question}", quiz.question)
          .replaceAll("{answer}", answer)
          .replaceAll("{context}", quiz.context || ""),
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
  config:
    | {
        context?: string
      }
    | string,
  difficulty: string
) => {
  const stream = createStreamableValue<StreamQuizResponse>()
  const chapter = await getChapter(id)

  if (!chapter) {
    throw new Error("Chapter not found")
  }

  const quiz = _.isString(config)
    ? await getQuizes(id).then((d) => {
        const quiz = d[config]
        if (!quiz || quiz.kind !== "random") throw new Error("Quiz not found")
        return quiz
      })
    : config

  ;(async () => {
    try {
      const { fullStream } = await streamText({
        model,
        prompt: QUESTION_PROMPT.replaceAll(
          "{reference_content}",
          chapter.content
        )
          .replaceAll("{difficulty}", difficulty)
          .replaceAll("{context}", quiz.context || ""),
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
