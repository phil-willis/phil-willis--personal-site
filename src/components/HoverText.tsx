import { TextHoverEffect } from '@/components/ui/text-hover-effect'

export function HoverText() {
  return (
    <div className="flex items-center justify-center overflow-visible px-8">
      <div className="w-full max-w-sm mx-auto overflow-visible">
        <TextHoverEffect text="PHIL WILLIS" />
      </div>
    </div>
  )
}
