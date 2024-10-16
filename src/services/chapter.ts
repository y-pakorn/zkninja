"use server"

import { promises as fs } from "fs"
import { cache } from "react"
import { LineReader } from "@dwesley/linereader"
import _ from "lodash"
import yaml from "yaml"

import { Chapter, ChapterContent } from "@/types/chapter"
import { Quiz } from "@/types/quiz"
import { DEFAULT_CHAPTER } from "@/config/chapter"

const CHAPTER_NO_REGEX = /(\d\d)/g

export const getAllChapters = cache(async (): Promise<Chapter[]> => {
  const contents = await fs.readdir("book/content")
  const chapters = (await Promise.all(
    contents.map(async (f) => {
      const reader = LineReader.create(`book/content/${f}`, "utf8")
      const line = await reader.nextLine<string>()
      reader.close()
      const matched = f.match(CHAPTER_NO_REGEX)
      return {
        prefix: matched?.map((m) => Number(m)).filter((v) => v > 0) || [],
        title: line?.split("#")?.[1]?.trim(),
        href: f.replace(".mdx", ""),
      }
    })
  ).then((c) => _.filter(c, (v) => v.title))) as Chapter[]
  return chapters
})

export const getChapter = cache(
  async (id: string = DEFAULT_CHAPTER): Promise<ChapterContent> => {
    const content = await fs.readFile(`book/content/${id}.mdx`, "utf8")
    return {
      content,
      id,
    }
  }
)

export const getAllSectionContentByChapterId = cache(
  async (id: string): Promise<ChapterContent[]> => {
    const allChapters = await getAllChapters()
    const firstChapterId = Number(id.split("-")[0])
    const matchedChapters = allChapters.filter(
      (chapter) => chapter.prefix[0] === Number(firstChapterId)
    )
    const chapterContents = await Promise.all(
      matchedChapters.map((chapter) => getChapter(chapter.href))
    )
    return chapterContents
  }
)

export const getQuizes = cache(
  async (id: string = DEFAULT_CHAPTER): Promise<Record<string, Quiz>> => {
    const name = id.match(CHAPTER_NO_REGEX)?.join("-")
    if (!name) return {}
    const text = await fs
      .readFile(`book/quiz/${name}.yaml`, "utf8")
      .catch(() => null)
    if (!text) return {}
    const quizes = yaml.parse(text)
    return _.keyBy(quizes, "id")
  }
)
