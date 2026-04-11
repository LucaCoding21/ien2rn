"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const contentRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column - slide from left
      const leftEls = contentRef.current!.querySelectorAll(".contact-left > *");
      gsap.set(leftEls, { x: -25, autoAlpha: 0 });
      gsap.to(leftEls, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 75%" },
      });

      // Right column - slide from right
      const rightEls = contentRef.current!.querySelectorAll(".contact-right > *");
      gsap.set(rightEls, { x: 25, autoAlpha: 0 });
      gsap.to(rightEls, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 75%" },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        label="Contact"
        heading="We'd love to hear from you"
        description="Have a question that isn't answered on our website? Drop us a message and our team will get back to you."
        image="/mentorship.jpg"
      />

      <section ref={contentRef} className="pt-8 md:pt-12 pb-8 md:pb-12">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20">
            {/* Left - Large contact info */}
            <div className="lg:col-span-5 contact-left">
              <h2 className="font-heading font-bold text-2xl text-foreground mb-8">
                Get in touch
              </h2>

              <div className="space-y-6 lg:space-y-8 mb-12">
                <div>
                  <p className="font-body text-xs font-semibold text-accent lg:text-muted uppercase tracking-wider mb-1.5 lg:mb-2">Phone</p>
                  <a href="tel:+16042295549" className="font-heading font-bold text-lg md:text-2xl text-foreground hover:text-primary transition-colors duration-300">
                    (604) 229-5549
                  </a>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-accent lg:text-muted uppercase tracking-wider mb-1.5 lg:mb-2">Email</p>
                  <a href="mailto:NurseMentor@ien2RN.org" className="font-heading font-bold text-lg md:text-2xl text-foreground hover:text-primary transition-colors duration-300 break-all">
                    NurseMentor@ien2RN.org
                  </a>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-accent lg:text-muted uppercase tracking-wider mb-1.5 lg:mb-2">Website</p>
                  <a href="https://www.ien2rn.org" className="font-heading font-bold text-lg md:text-2xl text-foreground hover:text-primary transition-colors duration-300">
                    www.ien2rn.org
                  </a>
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-accent lg:text-muted uppercase tracking-wider mb-1.5 lg:mb-2">Location</p>
                  <p className="font-heading font-bold text-lg md:text-2xl text-foreground">
                    Vancouver, British Columbia
                  </p>
                </div>
              </div>

              <div className="h-px bg-secondary/20 mb-8" />

              <h3 className="font-heading font-bold text-sm text-foreground mb-4">
                Looking for something specific?
              </h3>
              <div className="space-y-3">
                {[
                  { label: "I'm a nurse looking for work", href: "/candidates" },
                  { label: "I'm an employer looking for staff", href: "/employers" },
                  { label: "I want to explore courses", href: "/learning/courses" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2.5 font-body text-sm text-muted hover:text-primary transition-colors duration-300 group"
                  >
                    <svg
                      className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-7 contact-right bg-white border border-secondary/15 rounded-2xl p-6 sm:p-8 lg:bg-transparent lg:border-0 lg:rounded-none lg:p-0">
              <h2 className="font-heading font-bold text-2xl text-foreground mb-8">
                Send us a message
              </h2>

              {submitted ? (
                <div className="bg-secondary-light/40 rounded-3xl p-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    Message sent!
                  </h3>
                  <p className="font-body text-sm text-muted">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full font-body text-sm px-5 py-3.5 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full font-body text-sm px-5 py-3.5 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full font-body text-sm px-5 py-3.5 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <select className="w-full font-body text-sm px-5 py-3.5 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors text-muted">
                      <option value="">Select a topic</option>
                      <option value="general">General inquiry</option>
                      <option value="candidate">I&apos;m a nurse looking for work</option>
                      <option value="employer">I&apos;m an employer looking for staff</option>
                      <option value="learning">Question about courses or resources</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full font-body text-sm px-5 py-3.5 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                  >
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
