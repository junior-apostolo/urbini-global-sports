import type { Position } from '@/data/athletes'

// Attack runs left -> right, so the goalkeeper sits at the left goal.
const POSITION_DOT: Record<Position, { x: number; y: number }> = {
  Goleiro: { x: 7, y: 32 },
  Zagueiro: { x: 24, y: 32 },
  Lateral: { x: 38, y: 9 },
  'Meio-campo': { x: 52, y: 32 },
  Atacante: { x: 82, y: 32 },
}

interface PositionPitchProps {
  position: Position
  className?: string
}

/** Decorative mini pitch with a dot marking where the athlete plays. The position is always spelled out in text next to it. */
export function PositionPitch({ position, className }: PositionPitchProps) {
  const { x, y } = POSITION_DOT[position]

  return (
    <svg viewBox="0 0 100 64" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth={0.7} className="text-white/35">
        <rect x={0.5} y={0.5} width={99} height={63} />
        <line x1={50} y1={0.5} x2={50} y2={63.5} />
        <circle cx={50} cy={32} r={8} />
        <rect x={0.5} y={17} width={14} height={30} />
        <rect x={0.5} y={25} width={5} height={14} />
        <rect x={85.5} y={17} width={14} height={30} />
        <rect x={94.5} y={25} width={5} height={14} />
      </g>
      <circle cx={x} cy={y} r={5.5} className="fill-brand-500/30" />
      <circle cx={x} cy={y} r={2.6} className="fill-brand-500" />
    </svg>
  )
}
