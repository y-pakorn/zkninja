import Image, { ImageProps } from "next/image"
import type { MDXComponents } from "mdx/types"

import { Separator } from "./components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table"
import { cn } from "./lib/utils"

export const MDX_COMPONENTS: MDXComponents = {
  hr: (props) => <Separator {...props} className="my-8" />,
  blockquote: (props) => (
    <blockquote {...props} className="my-4 border-l-4 border-border pl-4" />
  ),
  table: (props) => (
    <div className="rounded-md border">
      <Table {...props} className={cn("my-0", props.className)} />
    </div>
  ),
  tr: (props) => (
    <TableRow {...props} className={cn("border-border", props.className)} />
  ),
  thead: (props) => <TableHeader {...props} />,
  td: (props) => <TableCell {...props} />,
  th: (props) => (
    <TableHead {...props} className={cn("py-0", props.className)} />
  ),
  tbody: (props) => <TableBody {...props} />,
  tfoot: (props) => <TableFooter {...props} />,
  caption: (props) => (
    <TableCaption className={props.className} children={props.children} />
  ),
} as const

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...MDX_COMPONENTS,
    ...components,
  }
}
