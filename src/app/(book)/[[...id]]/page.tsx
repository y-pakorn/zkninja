import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllChapters, getChapter, getQuizes } from "@/services/chapter"
import _ from "lodash"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Chapter } from "@/types/chapter"
import { DEFAULT_CHAPTER } from "@/config/chapter"
import { buttonVariants } from "@/components/ui/button"
import { QuizMarkdown } from "@/components/markdown"

export async function generateStaticParams() {
  const chapters = await getAllChapters()

  return [
    {
      id: undefined,
    },
    {
      id: [],
    },
    ...chapters.map((c) => ({
      id: [c.href],
    })),
  ]
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id?: string[] }
}): Promise<Metadata> {
  const ctnId = id?.[0] || DEFAULT_CHAPTER
  const chapter = await getAllChapters().then((c) => _.find(c, { href: ctnId }))

  return {
    title: chapter?.title,
    description: chapter?.description,
  }
}

export default async function Home({
  params: { id },
}: {
  params: { id?: string[] }
}) {
  const ctnId = id?.[0] || DEFAULT_CHAPTER

  const chapters = await getAllChapters()
  const currentChapterIdx = _.findIndex(chapters, (c) => c.href === ctnId)

  if (currentChapterIdx === -1) {
    notFound()
  }

  const { content } = await getChapter(ctnId)
  const quizes = await getQuizes(ctnId)

  const nextChapter: Chapter | undefined = chapters[currentChapterIdx + 1]
  const prevChapter: Chapter | undefined = chapters[currentChapterIdx - 1]

  return (
    <article className="prose min-w-full py-6 text-primary dark:prose-invert">
      <QuizMarkdown content={content} quizes={quizes} />

      <div className="flex *:no-underline">
        {prevChapter && (
          <Link
            href={`/${prevChapter?.href}`}
            className={buttonVariants({
              variant: "outline",
              className: "mr-auto",
            })}
          >
            <ChevronLeft className="mr-2 size-4" />
            Prev
          </Link>
        )}
        {nextChapter && (
          <Link
            href={`/${nextChapter.href}`}
            className={buttonVariants({
              variant: "outline",
              className: "ml-auto",
            })}
          >
            Next
            <ChevronRight className="ml-2 size-4" />
          </Link>
        )}
      </div>
    </article>
  )
}
