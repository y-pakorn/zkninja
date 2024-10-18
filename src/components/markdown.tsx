import { memo } from "react"
import * as runtime from "react/jsx-runtime"
import { MDX_COMPONENTS } from "@/useMDXComponents"
import { evaluate } from "@mdx-js/mdx"
import _ from "lodash"
import { MDXComponents } from "mdx/types"
import RMD from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { Quiz } from "@/types/quiz"
import { cn } from "@/lib/utils"

import { QuizCard } from "./quiz-card"

interface MarkdownProps {
  content: string
  components?: MDXComponents
}

const QuizMarkdown = async ({
  content,
  components,
  quizes,
}: MarkdownProps & {
  quizes: Record<string, Quiz>
}) => {
  return (
    <Markdown
      content={content}
      components={{
        ...components,
        Quiz: ({ id }: { id: string }) => <QuizCard quiz={quizes[id]} />,
        RandomQuiz: () => (
          <QuizCard
            quiz={{
              id: "",
              kind: "random",
            }}
          />
        ),
      }}
    />
  )
}

const Markdown = async ({ content, components }: MarkdownProps) => {
  const { default: MDXContent } = await evaluate(content, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  })

  return (
    <MDXContent
      components={{
        ...MDX_COMPONENTS,
        ...components,
      }}
    />
  )
}
Markdown.displayName = "Markdown"

const ClientMarkdown = memo(
  ({ content, className }: { content: string; className?: string }) => {
    return (
      <RMD
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        className={cn("whitespace-normal", className)}
        components={MDX_COMPONENTS as any}
      >
        {content}
      </RMD>
    )
  }
)

export { Markdown, QuizMarkdown, ClientMarkdown }
