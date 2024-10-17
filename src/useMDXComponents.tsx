import Image, { ImageProps } from "next/image"
import type { MDXComponents } from "mdx/types"

import { Separator } from "./components/ui/separator"

export const MDX_COMPONENTS: MDXComponents = {
  hr: (props) => <Separator {...props} className="my-8" />,
  blockquote: (props) => (
    <blockquote {...props} className="my-4 border-l-4 border-border pl-4" />
  ),
} as const

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...MDX_COMPONENTS,
    ...components,
  }
}
