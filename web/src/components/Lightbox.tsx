import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export function ZoomImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
        className={`cursor-zoom-in ${className}`}
      />
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] grid cursor-zoom-out place-items-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
          >
            <button type="button" aria-label="Fechar" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
              <X className="size-5" />
            </button>
            <img src={src} alt={alt} className="max-h-full max-w-full rounded-lg object-contain shadow-2xl" />
          </div>,
          document.body,
        )}
    </>
  )
}
