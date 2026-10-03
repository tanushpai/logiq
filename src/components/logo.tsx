import { cn } from "@/lib/utils";

export function LogiqLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none">
        <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="2.5" />
        <line x1="27" y1="27" x2="34" y2="34" stroke="var(--bronze)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="text-lg font-medium tracking-wide">
        LOG<span className="text-bronze">!</span>Q
      </span>
    </div>
  );
}