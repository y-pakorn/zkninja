import Link from "next/link"
import { Omega } from "lucide-react"
import { FaGithub, FaUserNinja } from "react-icons/fa"

import { Chapter } from "@/types/chapter"
import { siteConfig } from "@/config/site"

import { ModeToggle } from "./mode-toggle"
import { Search } from "./search"
import { buttonVariants } from "./ui/button"

const NavBar = ({ chapters }: { chapters: Chapter[] }) => {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/" className="inline-flex items-center gap-2 font-bold">
        <span>🥷</span>
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
          className: "shrink-0",
        })}
      >
        <FaGithub className="size-4" />
      </Link>
      <ModeToggle />
    </nav>
  )
}
NavBar.displayName = "NavBar"

export { NavBar }
