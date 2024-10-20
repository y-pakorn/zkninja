"use client"

import { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import _ from "lodash"

import { Chapter } from "@/types/chapter"
import { DEFAULT_CHAPTER } from "@/config/chapter"
import { cn } from "@/lib/utils"

const SidebarNav = ({ chapters }: { chapters: Chapter[] }) => {
  const groupped = useMemo(
    () =>
      _.chain(chapters)
        .groupBy((c) => c.prefix[0] || 0)
        .entries()
        .value(),
    [chapters]
  )

  return (
    <div className="w-full space-y-2 text-sm text-muted-foreground">
      {groupped[0][1].map((chapter) => (
        <SidebarNavItem chapter={chapter} key={chapter.href} />
      ))}
      {groupped.slice(1).map(([id, chapters]) => (
        <div key={id} className="flex flex-col space-y-1.5">
          <SidebarNavItem chapter={chapters[0]} />
          {chapters.slice(1).map((chapter) => (
            <SidebarNavItem
              chapter={chapter}
              key={chapter.href}
              className="pl-4"
            />
          ))}
        </div>
      ))}
    </div>
  )
}
SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = ({
  chapter,
  className,
}: {
  chapter: Chapter
  className?: string
}) => {
  const pathname = usePathname()
  const path = pathname.replace("/", "")

  return (
    <Link
      href={`/${chapter.href}`}
      className={cn(
        className,
        (path === chapter.href ||
          (!path && chapter.href === DEFAULT_CHAPTER)) &&
          "font-semibold text-primary"
      )}
    >
      {chapter.prefix.length > 0 && (
        <span className="mr-2 font-mono font-bold">
          {chapter.prefix.join(".")}
        </span>
      )}
      {chapter.title}
    </Link>
  )
}

export { SidebarNav }
