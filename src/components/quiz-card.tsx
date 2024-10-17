import { ReactNode } from "react"
import _ from "lodash"
import { match, P } from "ts-pattern"

import { Quiz } from "@/types/quiz"
import { cn } from "@/lib/utils"

import {
  ChoiceQuizContent,
  OpenEndedQuizContent,
  RandomQuizContent,
} from "./quiz-content"
import { Badge } from "./ui/badge"

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
      <Badge variant="outline">
        {match(quiz)
          .with(
            { kind: "choice", answers: P.when((a) => !_.isArray(a)) },
            () => "Single Choice"
          )
          .with({ kind: "choice" }, () => "Multiple Choice")
          .with({ kind: "open-ended" }, () => "Open Ended")
          .with({ kind: "random" }, () => "Random")
          .exhaustive()}
      </Badge>
      {match(quiz)
        .with(
          {
            kind: "random",
          },
          (q) => <RandomQuizContent quiz={q} />
        )
        .with({ kind: "choice" }, (q) => <ChoiceQuizContent quiz={q} />)
        .with({ kind: "open-ended" }, (q) => <OpenEndedQuizContent quiz={q} />)
        .exhaustive()}
    </QuizCardWrapper>
  )
}
QuizCard.displayName = "QuizCard"

export { QuizCard }
