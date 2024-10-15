import Link from "next/link"
import { getAllChapters, getChapter, getQuizes } from "@/services/chapter"
import _ from "lodash"
import { Omega } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { QuizMarkdown } from "@/components/markdown"
import { Search } from "@/components/search"
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
      <nav className="sticky top-0 z-50 flex h-14 items-center gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex gap-2">
          <Omega className="stroke-2" />
          <Link href="/" className="font-bold">
            ZK Ninja
          </Link>
        </div>
        <div className="flex-1" />
        <Search chapters={chapters} />
      </nav>
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
