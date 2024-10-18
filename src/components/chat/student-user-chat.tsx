"use client"

import { useCallback, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { streamChatQuizResponse } from "@/services/ai-chat"
import { readStreamableValue } from "ai/rsc"
import { Send } from "lucide-react"

import { ChatMessage } from "@/types/chat"
import { StudentTeacherChatQuiz } from "@/types/quiz"
import { STUDENT_FIRST_MSG } from "@/config/prompt"
import { cn } from "@/lib/utils"

import { BouncingDots } from "../bouncing-dots"
import { ClientMarkdown } from "../markdown"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const StudentTeacherChat = ({ quiz }: { quiz: StudentTeacherChatQuiz }) => {
  const pathname = usePathname()

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: (quiz.firstMessage || STUDENT_FIRST_MSG).replaceAll(
        "{topic}",
        quiz.topic
      ),
    },
  ])

  const scrollToBottom = () => {
    window.scrollTo({
      top: chatRef.current?.scrollHeight,
      behavior: "smooth",
    })
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = useCallback(
    async (message: string) => {
      try {
        scrollToBottom()

        setIsSubmitting(true)
        const newMessages: ChatMessage[] = [
          ...messages,
          {
            role: "user",
            content: message,
          },
        ]
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "",
          },
        ])

        scrollToBottom()

        const { stream } = await streamChatQuizResponse(
          pathname.replace("/", ""),
          quiz.id,
          newMessages.slice(-20)
        )

        scrollToBottom()

        let response = ""
        for await (const r of readStreamableValue(stream)) {
          if (!r) continue
          response += r.delta
          setMessages([
            ...newMessages,
            {
              role: "assistant",
              content: response,
            },
          ])
          scrollToBottom()
        }
      } catch (e) {
        setMessages(messages)
        throw e
      } finally {
        setIsSubmitting(false)
      }
    },
    [messages, pathname]
  )

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="space-y-8 py-8" ref={chatRef}>
      <div className="space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-2",
              message.role === "user" && "justify-end"
            )}
          >
            {message.role === "assistant" && (
              <>
                <img
                  className="mb-0 mt-2 aspect-square size-8 rounded-full"
                  src="https://wallpapers-clan.com/wp-content/uploads/2022/05/meme-pfp-02.jpg"
                />
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Student</div>
                  {isSubmitting &&
                  i === messages.length - 1 &&
                  !message.content ? (
                    <BouncingDots className="h-6" />
                  ) : (
                    <ClientMarkdown
                      content={message.content}
                      className="my-0 max-w-[95%] rounded-md bg-secondary p-2 text-sm prose-p:my-0 md:max-w-[80%]"
                    />
                  )}
                </div>
              </>
            )}
            {message.role === "user" && (
              <>
                <ClientMarkdown
                  content={message.content}
                  className="my-0 max-w-[95%] rounded-md bg-secondary p-2 text-sm prose-p:my-0 md:max-w-[80%]"
                />
              </>
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const message = (e.target as any)[0].value
          ;(e.target as any)[0].value = ""
          await submit(message)
          textareaRef.current?.focus()
        }}
        ref={formRef}
        className="flex gap-2"
      >
        <Textarea
          ref={textareaRef}
          className="md:min-h-14"
          placeholder="Chat with your student. You can use LaTeX syntax, e.g. $\frac{1}{2}$, or markdown syntax, e.g. *this is bold*."
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              formRef.current?.requestSubmit()
            }
          }}
        />
        <Button size="icon" className="shrink-0" type="submit">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  )
}
StudentTeacherChat.displayName = "StudentTeacherChat"

export { StudentTeacherChat }
