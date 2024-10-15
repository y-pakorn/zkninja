import { ReactNode } from "react"
import Latex from "react-latex-next"
import { match } from "ts-pattern"

import { Quiz } from "@/types/quiz"
import { cn } from "@/lib/utils"

import { ChoiceQuizContent, OpenEndedQuizContent } from "./quiz-content"

const QuizCardWrapper = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "my-4 w-full rounded-md border bg-secondary/50 p-4",
        className
      )}
    >
      {children}
    </div>
  )
}
QuizCardWrapper.displayName = "QuizCardWrapper"

const QuizCard = ({ quiz }: { quiz?: Quiz }) => {
  if (!quiz)
    return (
      <QuizCardWrapper className="flex justify-center text-sm italic">
        Quiz Not Found
      </QuizCardWrapper>
    )

  return (
    <QuizCardWrapper className="space-y-2">
      <div>
        <span className="mr-2 italic">Quiz:</span>
        <span className="font-semibold">
          <Latex>{quiz.question}</Latex>
        </span>
      </div>
      {quiz.context && (
        <div className="text-sm text-muted-foreground">
          <Latex>{quiz.context}</Latex>
        </div>
      )}
      {match(quiz)
        .with({ kind: "choice" }, (q) => <ChoiceQuizContent quiz={q} />)
        .with({ kind: "open-ended" }, (q) => <OpenEndedQuizContent quiz={q} />)
        .exhaustive()}
    </QuizCardWrapper>
  )
}
QuizCard.displayName = "QuizCard"

export { QuizCard }
