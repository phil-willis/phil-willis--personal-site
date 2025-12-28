type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'

type LedCalculatorNameProps = {
  text?: string
  uppercase?: boolean
  /** Spacing between characters (viewBox units). */
  charGap?: number
  /** Segment stroke width (viewBox units). */
  segmentWidth?: number
  /** Opacity of unlit segments. */
  offOpacity?: number
  className?: string
  title?: string
}

const CHAR_W = 120
const CHAR_H = 180

function segmentsForChar(char: string): Set<Segment> {
  const c = char.toUpperCase()

  // 7-seg base: a(top), b(upper-right), c(lower-right), d(bottom), e(lower-left), f(upper-left), g(middle)
  // Extra diagonals: h(upper-left diag), i(upper-right diag), j(lower-left diag), k(lower-right diag)
  switch (c) {
    case ' ': {
      return new Set()
    }

    case '0':
    case 'O': {
      return new Set(['a', 'b', 'c', 'd', 'e', 'f'])
    }

    case '1': {
      return new Set(['b', 'c'])
    }

    case 'I': {
      return new Set(['a', 'd', 'l', 'm'])
    }

    case '2': {
      return new Set(['a', 'b', 'g', 'e', 'd'])
    }

    case '3': {
      return new Set(['a', 'b', 'g', 'c', 'd'])
    }

    case '4': {
      return new Set(['f', 'g', 'b', 'c'])
    }

    case '5': {
      return new Set(['a', 'f', 'g', 'c', 'd'])
    }

    case 'S': {
      return new Set(['a', 'f', 'g', 'c', 'd'])
    }

    case '6': {
      return new Set(['a', 'f', 'g', 'c', 'd', 'e'])
    }

    case '7': {
      return new Set(['a', 'b', 'c'])
    }

    case '8': {
      return new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    }

    case '9': {
      return new Set(['a', 'b', 'c', 'd', 'f', 'g'])
    }

    case 'A': {
      return new Set(['a', 'b', 'c', 'e', 'f', 'g'])
    }

    case 'B': {
      // Approximate with right side + mid + bottom
      return new Set(['c', 'd', 'e', 'f', 'g'])
    }

    case 'C': {
      return new Set(['a', 'd', 'e', 'f'])
    }

    case 'D': {
      return new Set(['b', 'c', 'd', 'e', 'g'])
    }

    case 'E': {
      return new Set(['a', 'd', 'e', 'f', 'g'])
    }

    case 'F': {
      return new Set(['a', 'e', 'f', 'g'])
    }

    case 'G': {
      return new Set(['a', 'c', 'd', 'e', 'f'])
    }

    case 'H': {
      return new Set(['b', 'c', 'e', 'f', 'g'])
    }

    case 'J': {
      return new Set(['b', 'c', 'd'])
    }

    case 'L': {
      return new Set(['d', 'e', 'f'])
    }

    case 'N': {
      // Use diagonals to suggest N
      return new Set(['b', 'c', 'e', 'f', 'h', 'k'])
    }

    case 'P': {
      return new Set(['a', 'b', 'e', 'f', 'g'])
    }

    case 'R': {
      return new Set(['a', 'b', 'e', 'f', 'g', 'k'])
    }

    case 'U': {
      return new Set(['b', 'c', 'd', 'e', 'f'])
    }

    case 'V': {
      return new Set(['e', 'f', 'j', 'k'])
    }

    case 'W': {
      // Calculator-like W: verticals + lower diagonals
      return new Set(['b', 'c', 'e', 'f', 'j', 'k'])
    }

    case 'Y': {
      return new Set(['b', 'c', 'd', 'f', 'g'])
    }

    case 'Z': {
      return new Set(['a', 'd', 'h', 'k'])
    }

    case '-': {
      return new Set(['g'])
    }

    default: {
      // Fallback to a dash
      return new Set(['g'])
    }
  }
}

function SegLine({
  x1,
  y1,
  x2,
  y2,
  on,
  segmentWidth,
  offOpacity,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  on: boolean
  segmentWidth: number
  offOpacity: number
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="currentColor"
      strokeWidth={segmentWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={on ? 1 : offOpacity}
    />
  )
}

function Character({
  char,
  x,
  segmentWidth,
  offOpacity,
}: {
  char: string
  x: number
  segmentWidth: number
  offOpacity: number
}) {
  const on = segmentsForChar(char)

  // Geometry inside a 120x180 box.
  const left = 18
  const right = CHAR_W - 18
  const top = 18
  const bottom = CHAR_H - 18
  const midY = Math.round((top + bottom) / 2)
  const upperY = Math.round((top + midY) / 2)
  const lowerY = Math.round((midY + bottom) / 2)
  const centerX = Math.round((left + right) / 2)

  return (
    <g transform={`translate(${x} 0)`}>
      <SegLine
        x1={left}
        y1={top}
        x2={right}
        y2={top}
        on={on.has('a')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={right}
        y1={top + 8}
        x2={right}
        y2={midY - 10}
        on={on.has('b')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={right}
        y1={midY + 10}
        x2={right}
        y2={bottom - 8}
        on={on.has('c')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={left}
        y1={bottom}
        x2={right}
        y2={bottom}
        on={on.has('d')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={left}
        y1={midY + 10}
        x2={left}
        y2={bottom - 8}
        on={on.has('e')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={left}
        y1={top + 8}
        x2={left}
        y2={midY - 10}
        on={on.has('f')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={left + 6}
        y1={midY}
        x2={right - 6}
        y2={midY}
        on={on.has('g')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />

      {/* Diagonals */}
      <SegLine
        x1={left + 2}
        y1={top + 10}
        x2={centerX - 6}
        y2={upperY + 8}
        on={on.has('h')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={right - 2}
        y1={top + 10}
        x2={centerX + 6}
        y2={upperY + 8}
        on={on.has('i')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={left + 2}
        y1={bottom - 10}
        x2={centerX - 6}
        y2={lowerY - 8}
        on={on.has('j')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={right - 2}
        y1={bottom - 10}
        x2={centerX + 6}
        y2={lowerY - 8}
        on={on.has('k')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />

      {/* Vertical center lines */}
      <SegLine
        x1={centerX}
        y1={top + 8}
        x2={centerX}
        y2={midY - 10}
        on={on.has('l')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
      <SegLine
        x1={centerX}
        y1={midY + 10}
        x2={centerX}
        y2={bottom - 8}
        on={on.has('m')}
        segmentWidth={segmentWidth}
        offOpacity={offOpacity}
      />
    </g>
  )
}

export function LedCalculatorName({
  text = 'Phil Willis',
  uppercase = true,
  charGap = 24,
  segmentWidth = 14,
  offOpacity = 0.08,
  className,
  title = 'Calculator LED name',
}: LedCalculatorNameProps) {
  const displayText = uppercase ? text.toUpperCase() : text
  const chars = [...displayText]
  const width = Math.max(1, chars.length * CHAR_W + Math.max(0, chars.length - 1) * charGap)

  return (
    <div className={className} aria-label={displayText} role="img">
      <svg
        viewBox={`0 0 ${width} ${CHAR_H}`}
        width={width}
        height={CHAR_H}
        aria-hidden="true"
        focusable="false"
      >
        <title>{title}</title>
        {chars.map((ch, i) => (
          <Character
            key={`${i}-${ch}`}
            char={ch}
            x={i * (CHAR_W + charGap)}
            segmentWidth={segmentWidth}
            offOpacity={offOpacity}
          />
        ))}
      </svg>
    </div>
  )
}
