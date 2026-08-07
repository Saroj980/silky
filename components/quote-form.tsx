'use client'

import { useState } from 'react'
import { Check, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

const fieldClass =
  'w-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 transition-colors focus:border-accent focus:bg-primary-foreground/10 focus:outline-none'

const labelClass =
  'mb-2 block text-[10px] font-semibold uppercase tracking-caps text-primary-foreground/60'

const industries = [
  'Hospitality',
  'Healthcare',
  'Education',
  'Corporate',
  'Aviation',
  'Restaurants',
  'Other',
]

export function QuoteForm() {
  const [sent, setSent] = useState(false)

  return (
    <section id="quote" className="bg-primary py-24 text-primary-foreground lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-10">
        <div>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[10px] font-semibold uppercase tracking-caps text-primary-foreground/65">
              Request a quotation
            </p>
          </div>
          <h2 className="mt-6 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-[2.75rem]">
            Tell us what your team needs to wear
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-primary-foreground/70 text-pretty">
            Share your requirement and an account manager responds within one business day with
            fabric options, indicative pricing and a production timeline.
          </p>

          {sent ? (
            <div
              role="status"
              className="mt-10 flex items-start gap-4 border border-accent/60 bg-primary-foreground/8 p-8 backdrop-blur-md"
            >
              <Check className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-serif text-xl">Request received</p>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                  Thank you. An account manager will contact you within one business day. For urgent
                  requirements, message us directly on WhatsApp.
                </p>
              </div>
            </div>
          ) : (
            <form
              className="mt-10 grid gap-6 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault()
                setSent(true)
              }}
            >
              <div>
                <label className={labelClass} htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="company">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  required
                  autoComplete="organization"
                  placeholder="Company name"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="industry">
                  Industry
                </label>
                <select id="industry" name="industry" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Select industry
                  </option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry} className="text-foreground">
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="quantity">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  required
                  placeholder="e.g. 250"
                  className={fieldClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="phone">
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+971 50 000 0000"
                  className={fieldClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Departments, garment types, fabrics, deadlines"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 text-[11px] font-semibold uppercase tracking-caps text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground hover:text-primary active:translate-y-0 sm:col-span-2 sm:w-fit"
              >
                Send Request
              </button>
            </form>
          )}
        </div>

        <aside className="self-start border border-primary-foreground/15 bg-primary-foreground/8 p-8 backdrop-blur-md lg:sticky lg:top-28 lg:p-10">
          <h3 className="font-serif text-2xl">Visit our showroom</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
            Bring your brand guidelines and leave with fabric swatches in hand.
          </p>

          <ul className="mt-9 flex flex-col gap-6 text-sm">
            <li className="flex gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-primary-foreground/80">
                Silky Textiles LLC
                <br />
                Al Fahidi Street, Bur Dubai
                <br />
                Dubai, United Arab Emirates
              </span>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="flex flex-col text-primary-foreground/80">
                <a href="tel:+97143000000" className="transition-colors hover:text-accent">
                  +971 4 300 0000
                </a>
                <a href="tel:+971500000000" className="transition-colors hover:text-accent">
                  +971 50 000 0000
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <a
                href="mailto:sales@silky.ae"
                className="text-primary-foreground/80 transition-colors hover:text-accent"
              >
                sales@silky.ae
              </a>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-primary-foreground/80">
                Saturday – Thursday, 9:00 – 19:00
                <br />
                Friday by appointment
              </span>
            </li>
          </ul>

          <a
            href="https://wa.me/971500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex w-full items-center justify-center gap-3 border border-accent px-6 py-4 text-[11px] font-semibold uppercase tracking-caps text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground"
          >
            <MessageCircle className="size-4" />
            Chat on WhatsApp
          </a>
        </aside>
      </div>
    </section>
  )
}
