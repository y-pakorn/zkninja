import { promises as fs } from "fs"
import * as runtime from "react/jsx-runtime"
import Link from "next/link"
import { getAllChapters, getChapter } from "@/services/chapter"
import { MDX_COMPONENTS } from "@/useMDXComponents"
//import { MDXRemote } from "next-mdx-remote/rsc"
//import { serialize } from "next-mdx-remote/serialize"
import { compile, evaluate, run } from "@mdx-js/mdx"
import _ from "lodash"
import { Omega } from "lucide-react"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "@/components/search"
import { SidebarNav } from "@/components/sidebar-nav"

export default async function Home({
  params: { id },
}: {
  params: { id?: string }
}) {
  const chapters = await getAllChapters()
  const { content } = await getChapter(id)
  //const mdxSource = await serialize(content)

  const { default: MDXContent, ...rest } = await evaluate(content, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  })

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
        <article className="prose min-w-full py-6 dark:prose-invert">
          {
            //<MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
          }
          <MDXContent components={MDX_COMPONENTS} />
        </article>
      </div>
    </main>
  )
}
