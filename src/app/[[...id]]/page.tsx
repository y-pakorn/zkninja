import { getAllChapters, getChapter, getQuizes } from "@/services/chapter"
import _ from "lodash"

import { ScrollArea } from "@/components/ui/scroll-area"
import { QuizMarkdown } from "@/components/markdown"
import { NavBar } from "@/components/nav-bar"
import { SidebarNav } from "@/components/sidebar-nav"

export default async function Home({
  params: { id },
}: {
  params: { id?: string[] }
}) {
  const chapters = await getAllChapters()
  const { content } = await getChapter(id?.[0])
  const quizes = await getQuizes(id?.[0])

  return (
    <main className="container flex flex-col">
      <NavBar chapters={chapters} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-8 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 lg:py-8">
            <SidebarNav chapters={chapters} />
          </ScrollArea>
        </aside>
        <article className="prose min-w-full py-6 text-primary dark:prose-invert">
          <QuizMarkdown content={content} quizes={quizes} />
        </article>
      </div>
    </main>
  )
}
