import Link from "next/link"
import { Omega } from "lucide-react"
import { FaGithub } from "react-icons/fa"

import { Chapter } from "@/types/chapter"
import { siteConfig } from "@/config/site"

import { Search } from "./search"
import { Button, buttonVariants } from "./ui/button"

const NavBar = ({ chapters }: { chapters: Chapter[] }) => {
  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/" className="inline-flex items-center gap-2 font-bold">
        <Omega className="stroke-2" />
        ZK Ninja
      </Link>
      <div className="flex-1" />
      <Search chapters={chapters} />
      <Link
        href={siteConfig.links.github}
        rel="noopener noreferrer"
        target="_blank"
        className={buttonVariants({
          size: "icon-xs",
          variant: "outline-opaque",
        })}
      >
        <FaGithub className="size-4" />
      </Link>
    </nav>
  )
}
NavBar.displayName = "NavBar"

export { NavBar }
