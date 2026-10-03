export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[15px] font-medium leading-none tracking-tight ${className}`}>
      <svg viewBox="0 0 64 64" className="block size-6 shrink-0" aria-hidden>
        <rect width="64" height="64" rx="16" className="fill-primary" />
        <path d="M22 50V14h14a11 11 0 0 1 0 22H22" fill="none" strokeWidth="8" strokeLinejoin="round" className="stroke-primary-foreground" />
        <circle cx="47" cy="47" r="5" className="fill-primary-foreground" />
      </svg>
      <span>
        gustavo<span className="text-muted-foreground">pulz</span>
      </span>
    </span>
  )
}
