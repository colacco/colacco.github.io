import { useEffect, useRef, useState } from 'react'
import leaves from '../assets/contact/leaves.png'
import { useLang } from '../i18n/language-context'
import { Reveal } from '../components/ui/Reveal'
import { ContactChannels } from '../components/contact/ContactChannels'

const rndMs = () => 28 + Math.floor(Math.random() * 30)

export function Contact() {
  const { t } = useLang()
  const [ms, setMs] = useState(42)
  const [typing, setTyping] = useState(false)
  const target = useRef('email')
  const buf = useRef('email')
  const pathRef = useRef<HTMLSpanElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const id = setInterval(() => setMs(rndMs()), 3400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  const retype = (next: string) => {
    if (next === target.current) return
    target.current = next
    clearTimeout(timer.current)
    setTyping(true)
    const step = () => {
      const cur = buf.current
      if (cur.length && !next.startsWith(cur)) {
        buf.current = cur.slice(0, -1)
      } else if (cur.length < next.length) {
        buf.current = next.slice(0, cur.length + 1)
      } else {
        setTyping(false)
        setMs(rndMs())
        return
      }
      if (pathRef.current) pathRef.current.textContent = buf.current
      timer.current = setTimeout(
        step,
        cur.length > buf.current.length ? 24 : 54,
      )
    }
    step()
  }

  return (
    <section id="contact" className="relative scroll-mt-20 pt-15 pb-27.5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] bottom-[-10%] left-1/2 w-screen -translate-x-1/2 opacity-(--pf-contact-art-opacity) motion-safe:animate-[pf-contact-sway_26s_ease-in-out_infinite] filter-(--pf-contact-art-filter) mask-[linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)] [mix-blend-mode:var(--pf-contact-art-blend)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]"
      >
        <img
          src={leaves}
          alt=""
          className="h-full w-full object-cover object-[50%_60%]"
        />
      </div>

      <div className="relative flex flex-col gap-6.5">
        <Reveal index={0}>
          <header className="flex flex-col gap-3">
            <h2 className="m-0 text-[clamp(30px,4.4vw,44px)] leading-[1.05] font-medium tracking-[-0.03em]">
              {t.contactTitle}
            </h2>
            <p className="text-pf-contact-dim m-0 max-w-140 text-[15.5px] text-pretty">
              {t.contactBody}
            </p>
          </header>
        </Reveal>

        <Reveal index={1}>
          <div className="border-pf-contact-line bg-pf-contact-sunk flex flex-wrap items-center gap-3 rounded-xl border px-4.5 py-4 font-mono text-[13.5px]">
            <span className="text-pf-contact-purple">$</span>
            <span className="text-pf-contact-dim">curl -X</span>
            <span className="text-pf-contact-purple font-bold">GET</span>
            <span>
              api.colaco/contact/
              <span ref={pathRef} className="text-pf-contact-blue">
                email
              </span>
              <span
                className="bg-pf-contact-blue ml-0.5 inline-block h-3.5 w-1.75 align-[-2px] motion-safe:animate-[pf-blink_0.85s_steps(1)_infinite]"
                style={{ opacity: typing ? 1 : 0 }}
              />
            </span>
            <span className="text-pf-contact-dim ml-auto flex items-center gap-3 text-xs">
              <span className="text-pf-contact-green">200 OK</span>
              <span>{ms}ms</span>
            </span>
          </div>
        </Reveal>

        <Reveal index={2}>
          <ContactChannels onHover={retype} />
        </Reveal>

      </div>
    </section>
  )
}
