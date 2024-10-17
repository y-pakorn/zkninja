import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllChapters, getChapter, getQuizes } from "@/services/chapter"
import _ from "lodash"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Chapter } from "@/types/chapter"
import { DEFAULT_CHAPTER } from "@/config/chapter"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { QuizMarkdown } from "@/components/markdown"
import { NavBar } from "@/components/nav-bar"
import { SidebarNav } from "@/components/sidebar-nav"

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
    <main className="container flex flex-col">
      <NavBar chapters={chapters} />
      <div className="container flex-1 items-start px-0 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 lg:py-8">
            <SidebarNav chapters={chapters} />
          </ScrollArea>
        </aside>
        <article className="prose min-w-full py-6 text-primary dark:prose-invert">
          <QuizMarkdown content={content} quizes={quizes} />

          <div className="flex *:no-underline">
            {
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
            }
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
      </div>
    </main>
  )
}
