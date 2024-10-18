import { cn } from "@/lib/utils"

const BouncingDots = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-2 *:size-1.5 *:bg-primary",
        className
      )}
    >
      <span className="sr-only">Loading...</span>
      <div className="animate-bounce rounded-full [animation-delay:-0.3s]"></div>
      <div className="animate-bounce rounded-full [animation-delay:-0.15s]"></div>
      <div className="animate-bounce rounded-full"></div>
    </div>
  )
}
BouncingDots.displayName = "BouncingDots"

export { BouncingDots }
