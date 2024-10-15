"use server"

import { promises as fs } from "fs"
import { LineReader } from "@dwesley/linereader"
import _ from "lodash"

import { Chapter, ChapterContent } from "@/types/chapter"
import { DEFAULT_CHAPTER } from "@/config/chapter"

export const getAllChapters = async (): Promise<Chapter[]> => {
  const contents = await fs.readdir("book/content")
  const chapterNoRegex = /(\d\d)/g
  const chapters = (await Promise.all(
    contents.map(async (f) => {
      const reader = LineReader.create(`book/content/${f}`, "utf8")
      const line = await reader.nextLine<string>()
      reader.close()
      const matched = f.match(chapterNoRegex)
      return {
        prefix: matched?.map((m) => Number(m)).filter((v) => v > 0) || [],
        title: line?.split("#")?.[1]?.trim(),
        href: f.replace(".mdx", ""),
      }
    })
  ).then((c) => _.filter(c, (v) => v.title))) as Chapter[]
  return chapters
}

export const getChapter = async (
  id: string = DEFAULT_CHAPTER
): Promise<ChapterContent> => {
  const content = await fs.readFile(`book/content/${id}.mdx`, "utf8")
  return {
    content,
  }
}
