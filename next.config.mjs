import createMDX from "@next/mdx"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    optimizeCss: true,
    mdxRs: true,
    outputFileTracingIncludes: {
      "/": ["./book/**/*"],
    },
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})

export default withMDX(nextConfig)
