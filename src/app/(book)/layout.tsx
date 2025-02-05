import { getAllChapters } from "@/services/chapter"

import { ScrollArea } from "@/components/ui/scroll-area"
import { NavBar } from "@/components/nav-bar"
import { SidebarNav } from "@/components/sidebar-nav"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const chapters = await getAllChapters()

  return (
    <main className="container flex-1 items-start px-0 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full py-6 lg:py-8">
          <SidebarNav chapters={chapters} />
        </ScrollArea>
      </aside>
      {children}
    </main>
  )
}
