import Image, { ImageProps } from "next/image"
import type { MDXComponents } from "mdx/types"

import { H1, H2, H3, H4, P, Quote } from "./components/ui/typography"

export const MDX_COMPONENTS: MDXComponents = {} as const

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...MDX_COMPONENTS,
    ...components,
  }
}
