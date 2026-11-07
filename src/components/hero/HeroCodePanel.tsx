import { useMemo } from 'react'

type TokenKind = 'cm' | 'kw' | 'ty' | 'st' | 'pr' | 'in' | 'sp'

const TOKEN_COLOR: Record<TokenKind, string> = {
  cm: '#9aa0bd',
  kw: '#c4a2ff',
  ty: '#7fd4c1',
  st: '#f0b982',
  pr: '#8f93ad',
  in: '#e6e8f5',
  sp: 'inherit',
}

const CODE_LINES: Array<Array<[TokenKind, string]>> = [
  [['cm', '// engineer.ts']],
  [
    ['kw', 'export type'],
    ['sp', ' '],
    ['ty', 'Engineer'],
    ['sp', ' '],
    ['pr', '= {'],
  ],
  [
    ['in', '  role'],
    ['pr', ':'],
    ['sp', ' '],
    ['ty', 'string'],
    ['pr', ';'],
  ],
  [
    ['in', '  focus'],
    ['pr', ':'],
    ['sp', ' '],
    ['ty', 'string'],
    ['pr', '[];'],
  ],
  [
    ['in', '  exploring'],
    ['pr', ':'],
    ['sp', ' '],
    ['ty', 'string'],
    ['pr', '[];'],
  ],
  [['pr', '};']],
  [],
  [
    ['kw', 'export const'],
    ['sp', ' '],
    ['in', 'gabriel'],
    ['pr', ':'],
    ['sp', ' '],
    ['ty', 'Engineer'],
    ['sp', ' '],
    ['pr', '= {'],
  ],
  [
    ['in', '  role'],
    ['pr', ':'],
    ['sp', ' '],
    ['st', '"software engineer"'],
    ['pr', ','],
  ],
  [
    ['in', '  focus'],
    ['pr', ':'],
    ['sp', ' '],
    ['pr', '['],
    ['st', '"backend"'],
    ['pr', ', '],
    ['st', '"cloud"'],
    ['pr', ', '],
    ['st', '"devops"'],
    ['pr', '],'],
  ],
  [
    ['in', '  exploring'],
    ['pr', ':'],
    ['sp', ' '],
    ['pr', '['],
    ['st', '"architecture"'],
    ['pr', ', '],
    ['st', '"observability"'],
    ['pr', ', '],
    ['st', '"AI"'],
    ['pr', '],'],
  ],
  [['pr', '};']],
]

interface HeroCodePanelProps {
  runLabel: string
  runShortLabel: string
}

export function HeroCodePanel({ runLabel, runShortLabel }: HeroCodePanelProps) {
  const gutterWidth = useMemo(() => String(CODE_LINES.length).length + 1, [])

  return (
    <div
      className="border-pf-code-border relative mx-auto w-full max-w-140 overflow-hidden rounded-[14px] border"
      style={{
        background: 'var(--pf-code-bg)',
        boxShadow: 'var(--pf-code-shadow)',
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(196,162,255,.55), rgba(127,212,193,.4), transparent)',
        }}
      />

      <div className="border-pf-code-line flex items-center gap-2.5 border-b px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.25 w-2.25 rounded-full" style={{ background: '#e06a72' }} />
          <span className="h-2.25 w-2.25 rounded-full" style={{ background: '#e0b45f' }} />
          <span className="h-2.25 w-2.25 rounded-full" style={{ background: '#68c48f' }} />
        </span>
        <span className="inline-flex items-center gap-1.75 font-mono text-[11px] text-[#c8cbe0]">
          <span
            aria-hidden="true"
            className="inline-flex h-3.75 w-3.75 items-center justify-center rounded-[3px] bg-[#3178c6] text-[8px] font-bold tracking-[-0.02em] text-white"
          >
            TS
          </span>
          engineer.ts
        </span>
        <span className="flex-1" />
        <a
          href="#experience"
          className="inline-flex h-6.5 items-center gap-1.5 rounded-md border border-[rgba(196,162,255,.5)] px-2.5 font-mono text-[12px] text-[#c4a2ff] no-underline transition-[border-color,color,background] duration-250 hover:border-[#c4a2ff] hover:bg-[rgba(196,162,255,.14)] hover:text-[#c4a2ff]"
        >
          <i className="ph ph-play text-[11px]" aria-hidden="true" />
          <span className="sm:hidden">{runShortLabel}</span>
          <span className="hidden sm:inline">{runLabel}</span>
        </a>
      </div>

      <pre className="m-0 px-4 py-[clamp(10px,2.6vh,20px)] font-mono text-[clamp(11px,1.05vw,12.5px)] leading-[clamp(1.3em,2.4vh,1.95em)] text-[#e6e8f5]">
        {CODE_LINES.map((tokens, i) => (
          <div className="flex gap-3.5" key={i}>
            <span
              className="flex-none text-right text-[#9298b5] select-none"
              style={{ width: `${gutterWidth}ch` }}
            >
              {i + 1}
            </span>
            <span className="min-w-0 wrap-anywhere whitespace-pre-wrap">
              {tokens.length === 0
                ? ' '
                : tokens.map(([kind, text], j) => (
                    <span
                      key={j}
                      className={kind === 'cm' ? 'italic' : undefined}
                      style={{ color: TOKEN_COLOR[kind] }}
                    >
                      {text}
                    </span>
                  ))}
            </span>
          </div>
        ))}
      </pre>
    </div>
  )
}
