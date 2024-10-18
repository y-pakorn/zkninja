"use client"

import { usePathname } from "next/navigation"

import { StudentTeacherChatQuiz } from "@/types/quiz"

const StudentTeacherChat = ({ quiz }: { quiz: StudentTeacherChatQuiz }) => {
  const pathname = usePathname()

  return <></>
}
StudentTeacherChat.displayName = "StudentTeacherChat"

export { StudentTeacherChat }
