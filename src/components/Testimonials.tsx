"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Moving to Canada felt very hard until I found ien2RN. They helped me with every step. In four months, I was working full-time at a hospital in Toronto.",
    name: "Amara O.",
    role: "Registered Nurse, Toronto",
    initials: "AO",
  },
  {
    quote:
      "Finding qualified internationally educated nurses used to take months. ien2RN changed that. Their candidates are prepared and ready to work from day one.",
    name: "Dr. Sarah Chen",
    role: "Director of Nursing, Vancouver",
    initials: "SC",
  },
  {
    quote:
      "The team at ien2RN did not just find me a job — they helped me build a career. The training and mentorship made all the difference.",
    name: "James M.",
    role: "ICU Nurse, Ottawa",
    initials: "JM",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll(".testimonial-animate");
      gsap.set(els, { y: 30, autoAlpha: 0 });
      gsap.to(els, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const animateTransition = (next: number) => {
    if (!quoteRef.current || next === current) return;
    const tl = gsap.timeline();
    tl.to(quoteRef.current, {
      opacity: 0,
      y: -12,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setCurrent(next),
    }).to(quoteRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      delay: 0.05,
    });
  };

  const goNext = () =>
    animateTransition((current + 1) % testimonials.length);
  const goPrev = () =>
    animateTransition(current === 0 ? testimonials.length - 1 : current - 1);

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="pb-section pt-10 md:pt-14 bg-secondary-light/25">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="testimonial-animate font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
            Stories
          </p>
          <h2 className="testimonial-animate font-heading font-bold text-display-sm text-foreground mb-14">
            Hear from our community
          </h2>

          <div ref={quoteRef}>
            {/* Quote mark */}
            <svg
              className="testimonial-animate w-12 h-12 text-accent mx-auto mb-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11.25 13.441 11.25 15.625 11.25 16.82 10.82 17.926 10.037 18.713 9.254 19.5 8.197 19.929 7.05 19.929c-1.33 0-2.386-.486-2.467-.608zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.986.179 3.645 1.93 3.645 4.114 0 1.195-.43 2.301-1.213 3.088-.783.787-1.84 1.216-2.987 1.216-1.33 0-2.386-.486-2.467-.608z" />
            </svg>

            {/* Quote text — large, editorial */}
            <p className="testimonial-animate font-body text-xl md:text-2xl lg:text-[1.75rem] text-foreground leading-snug font-light mb-10 max-w-2xl mx-auto">
              {t.quote}
            </p>

            {/* Author */}
            <div className="testimonial-animate flex items-center justify-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center">
                <span className="font-heading font-bold text-sm text-white">
                  {t.initials}
                </span>
              </div>
              <div className="text-left">
                <p className="font-heading font-bold text-sm text-foreground">
                  {t.name}
                </p>
                <p className="font-body text-xs text-muted">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="testimonial-animate flex items-center justify-center gap-4 mt-12">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => animateTransition(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-secondary/40 hover:bg-secondary"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
