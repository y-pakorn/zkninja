"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Chapter } from "@/types/chapter"

import { Button } from "./ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"

const Search = ({ chapters }: { chapters: Chapter[] }) => {
  const [isOpen, setOpen] = useState(false)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline-opaque"
        size="xs"
        onClick={() => setOpen(true)}
        className="w-64"
      >
        Search for chapter...
        <code className="ml-auto rounded-sm bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground">
          ⌘K
        </code>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for chapter..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Chapters">
            {chapters.map((chapter) => (
              <Link href={`/${chapter.href}`} key={chapter.href}>
                <CommandItem>
                  <span className="mr-2 font-mono text-muted-foreground">
                    {chapter.prefix.join(".")}
                  </span>
                  {chapter.title}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
Search.displayName = "Search"

export { Search }
