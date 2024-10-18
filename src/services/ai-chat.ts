"use server"

import { streamText } from "ai"
import { createStreamableValue } from "ai/rsc"

import { ChatMessage } from "@/types/chat"
import { STUDENT_PROMPT } from "@/config/prompt"

import { model } from "./ai"
import {
  getAllSectionContentByChapterId,
  getChapter,
  getQuizes,
} from "./chapter"

type StreamChatQuizResponse = {
  delta: string
}

export const streamChatQuizResponse = async (
  id: string,
  quizId: string,
  messages: ChatMessage[]
) => {
  const stream = createStreamableValue<StreamChatQuizResponse>()
  const quiz = await getQuizes(id).then((q) => q[quizId])
  if (!quiz || quiz.kind !== "student-teacher-chat") {
    throw new Error("Quiz not found")
  }

  const chapter = quiz.section
    ? await getAllSectionContentByChapterId(id)
    : [await getChapter(id)]

  const content = chapter.map((c) => c.content).join("\n")

  ;(async () => {
    try {
      const { fullStream } = await streamText({
        model,
        messages: [
          {
            role: "system",
            content: STUDENT_PROMPT.replaceAll("{reference_content}", content)
              .replaceAll("{topic}", quiz.topic)
              .replaceAll("{context}", quiz.context || ""),
          },
          ...messages.slice(0, 20),
        ],
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
