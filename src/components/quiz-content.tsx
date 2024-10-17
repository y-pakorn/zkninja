"use client"

import { ReactNode, useCallback, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { streamQuizResult, streamRandomQuizQuestion } from "@/services/ai-quiz"
import { readStreamableValue } from "ai/rsc"
import _ from "lodash"
import { Check, Loader2, X } from "lucide-react"
import Latex from "react-latex-next"
import { toast } from "sonner"

import {
  ChoiceAnswer,
  ChoiceQuiz,
  OpenEndedQuiz,
  RandomQuiz,
  RandomQuizDifficulty,
} from "@/types/quiz"
import { cn } from "@/lib/utils"

import { ClientMarkdown } from "./markdown"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Textarea } from "./ui/textarea"

const CorrectMark = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium text-green-400",
        className
      )}
    >
      <Check className="size-3" />
      <span>Correct</span>
      {children}
    </div>
  )
}

const IncorrectMark = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-sm font-semibold text-red-400",
        className
      )}
    >
      <X className="size-4" />
      <span>Incorrect</span>
      {children}
    </div>
  )
}

const formatChoiceAnswer = (
  answer: ChoiceAnswer
): {
  text: string
  reason?: string
} => {
  if (_.isString(answer)) {
    return { text: answer }
  }
  return answer
}

const QuizHeader = ({
  question,
  context,
}: {
  question: string
  context?: string
}) => {
  return (
    <div>
      <ClientMarkdown content={question} />
      {context && (
        <div className="text-sm text-muted-foreground">
          <ClientMarkdown content={context} />
        </div>
      )}
    </div>
  )
}

const ChoiceQuizContent = ({ quiz }: { quiz: ChoiceQuiz }) => {
  const [selected, setSelected] = useState<string[]>([])
  const { allChoices, isRadio } = useMemo(
    () => ({
      isRadio: !_.isArray(quiz.answers),
      allChoices: _.chain(quiz.distractors)
        .concat(quiz.answers)
        .map(formatChoiceAnswer)
        .map((answer, i) => ({
          ...answer,
          isCorrect: i >= quiz.distractors.length,
        }))
        .value(),
    }),
    [quiz]
  )

  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <>
      <QuizHeader question={quiz.question} context={quiz.context} />
      {isRadio ? (
        <RadioGroup
          onValueChange={(value) => {
            setSelected([value])
          }}
          value={selected[0] || ""}
        >
          {allChoices.map((choice, idx) => {
            const value = choice.text
            const checked = value === selected[0]
            return (
              <div className="flex items-center gap-2" key={idx}>
                <RadioGroupItem
                  value={value}
                  id={value}
                  disabled={isSubmitted}
                />
                <Label htmlFor={value} className="font-normal">
                  <Latex>{value}</Latex>
                </Label>
                {isSubmitted &&
                  checked &&
                  (choice.isCorrect ? (
                    <CorrectMark />
                  ) : (
                    <IncorrectMark>
                      {choice.reason && <Latex>{choice.reason}</Latex>}
                    </IncorrectMark>
                  ))}
              </div>
            )
          })}
        </RadioGroup>
      ) : (
        allChoices.map((choice, idx) => {
          const value = choice.text
          const checked = selected.includes(value)
          return (
            <div key={idx}>
              <div className="flex items-center gap-2">
                <Checkbox
                  disabled={isSubmitted}
                  checked={checked}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelected([...selected, value])
                    } else {
                      setSelected(_.without(selected, value))
                    }
                  }}
                  id={value}
                />
                <Label htmlFor={value} className="font-normal">
                  <Latex>{value}</Latex>
                </Label>
              </div>
              {isSubmitted &&
                ((choice.isCorrect && checked) || !checked ? (
                  <CorrectMark className="ml-4" />
                ) : (
                  <IncorrectMark className="ml-4">
                    {choice.reason && <Latex>{choice.reason}</Latex>}
                  </IncorrectMark>
                ))}
            </div>
          )
        })
      )}
      <div className="mt-2 flex gap-2">
        <Button
          size="xs"
          variant="secondary"
          className="ml-auto"
          onClick={() => {
            setSelected([])
            setIsSubmitted(false)
          }}
          disabled={selected.length === 0}
        >
          Reset
        </Button>
        <Button
          size="xs"
          onClick={() => {
            setIsSubmitted(true)
          }}
          disabled={isSubmitted || selected.length === 0}
        >
          Submit
        </Button>
      </div>
    </>
  )
}
ChoiceQuizContent.displayName = "ChoiceQuizContent"

const OpenEndedQuizContent = ({ quiz }: { quiz: OpenEndedQuiz }) => {
  const [answer, setAnswer] = useState<string>("")
  const [response, setResponse] = useState<string>("")

  const pathname = usePathname()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const submit = useCallback(async () => {
    setIsSubmitting(true)

    try {
      const { stream } = await streamQuizResult(
        pathname.replace("/", ""),
        quiz.question,
        answer
      )
      for await (const r of readStreamableValue(stream)) {
        if (!r) continue
        setResponse((prev) =>
          (prev + r.delta).replace("<START>", "").replace("<END>", "").trim()
        )
      }
    } catch (e: any) {
      toast.error("Error", {
        description: e.message,
      })
    } finally {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }
  }, [pathname, answer, quiz])

  return (
    <div className="space-y-2">
      <QuizHeader question={quiz.question} context={quiz.context} />
      {answer && (
        <div className="whitespace-pre rounded-md border px-4 text-sm">
          <ClientMarkdown content={answer} />
        </div>
      )}
      <Textarea
        value={answer}
        placeholder="Type your answer here. You can use LaTeX syntax, e.g. $\frac{1}{2}$, or markdown syntax, e.g. *this is bold*."
        onChange={(e) => setAnswer(e.target.value)}
        className="min-h-10"
      />
      <ClientMarkdown content={response} />
      <div className="mt-2 flex gap-2">
        <Button
          size="xs"
          variant="secondary"
          className="ml-auto"
          onClick={() => {
            setAnswer("")
            setResponse("")
            setIsSubmitted(false)
          }}
          disabled={isSubmitting}
        >
          Reset
        </Button>
        <Button
          size="xs"
          onClick={submit}
          disabled={isSubmitting || isSubmitted}
        >
          Submit{" "}
          {isSubmitting && <Loader2 className="ml-1 size-3 animate-spin" />}
        </Button>
      </div>
    </div>
  )
}

const RandomQuizContent = ({ quiz }: { quiz: RandomQuiz }) => {
  const [question, setQuestion] = useState<string>("")
  const [isFetchingQuestion, setIsFetchingQuestion] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<RandomQuizDifficulty>(RandomQuizDifficulty.Easy)

  const pathname = usePathname()

  // Fetch question based on difficulty
  const fetchQuestion = useCallback(
    async (difficulty?: RandomQuizDifficulty) => {
      setIsFetchingQuestion(true)
      setQuestion("")
      if (difficulty) setSelectedDifficulty(difficulty)
      try {
        const { stream } = await streamRandomQuizQuestion(
          pathname.replace("/", ""),
          difficulty || selectedDifficulty,
          quiz.context
        )
        for await (const r of readStreamableValue(stream)) {
          if (!r) continue
          setQuestion((prev) => (prev + r.delta).trim())
        }
        console.log("Question fetched", question)
      } catch (e: any) {
        toast.error("Error", {
          description: e.message,
        })
      } finally {
        setIsFetchingQuestion(false)
      }
    },
    [quiz, pathname, selectedDifficulty]
  )

  const [answer, setAnswer] = useState<string>("")
  const [response, setResponse] = useState<string>("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const submit = useCallback(async () => {
    setIsSubmitting(true)

    try {
      const { stream } = await streamQuizResult(
        pathname.replace("/", ""),
        question,
        answer
      )
      for await (const r of readStreamableValue(stream)) {
        if (!r) continue
        setResponse((prev) =>
          (prev + r.delta).replace("<START>", "").replace("<END>", "").trim()
        )
      }
    } catch (e: any) {
      toast.error("Error", {
        description: e.message,
      })
    } finally {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }
  }, [pathname, answer, question])

  return (
    <>
      {isFetchingQuestion && !question ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="size-6 animate-spin" />
        </div>
      ) : !question ? (
        <div className="flex-col items-center space-y-2 text-center">
          <div>{quiz.label || "Are you ready to take on more challenges?"}</div>
          <div className="flex flex-wrap justify-center gap-2">
            {_.map(RandomQuizDifficulty, (v) => (
              <Button
                key={v}
                onClick={() => fetchQuestion(v)}
                variant="outline"
                size="sm"
                className="rounded-full px-4"
              >
                {_.startCase(v)}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <QuizHeader question={question} />
          {answer && (
            <div className="whitespace-pre rounded-md border px-4 text-sm">
              <ClientMarkdown content={answer} />
            </div>
          )}
          <Textarea
            value={answer}
            placeholder="Type your answer here. You can use LaTeX syntax, e.g. $\frac{1}{2}$, or markdown syntax, e.g. *this is bold*."
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-10"
          />
          <ClientMarkdown content={response} />
          <div className="mt-2 flex gap-2">
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setAnswer("")
                setResponse("")
                setIsSubmitted(false)
                setQuestion("")
              }}
              disabled={isSubmitting || isFetchingQuestion}
            >
              Back To Difficulty
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setAnswer("")
                setResponse("")
                setIsSubmitted(false)
                fetchQuestion()
              }}
              disabled={isSubmitting || isFetchingQuestion}
            >
              Next Question
            </Button>
            <Button
              size="xs"
              variant="secondary"
              className="ml-auto"
              onClick={() => {
                setAnswer("")
                setResponse("")
                setIsSubmitted(false)
              }}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              size="xs"
              onClick={submit}
              disabled={isSubmitting || isSubmitted}
            >
              Submit{" "}
              {isSubmitting && <Loader2 className="ml-1 size-3 animate-spin" />}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export { ChoiceQuizContent, OpenEndedQuizContent, RandomQuizContent }
