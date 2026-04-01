"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    quote:
      "Sheena\u2019s mentorship gave me the knowledge, confidence, and practical skills I needed to navigate my nursing registration and thrive in Canadian healthcare.",
    name: "2023 Mentee",
    role: "Internationally Educated Nurse",
    location: "Canada",
    image: "/testimonial-mentee.png",
  },
  {
    quote:
      "Finding qualified internationally educated nurses used to take months. ien2RN changed that. Their candidates are prepared and ready to work from day one.",
    name: "Dr. Sarah Chen",
    role: "Director of Nursing",
    location: "Vancouver",
  },
  {
    quote:
      "The team at ien2RN did not just find me a job. They helped me build a career. The training and mentorship made all the difference.",
    name: "James M.",
    role: "ICU Nurse",
    location: "Ottawa",
  },
];

export default function QuoteCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftEls = sectionRef.current!.querySelectorAll(".qc-left > *");
      gsap.set(leftEls, { x: -30, autoAlpha: 0 });
      gsap.to(leftEls, {
        x: 0,
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      const rightCol = sectionRef.current!.querySelector(".qc-right");
      gsap.set(rightCol, { autoAlpha: 0, y: 20 });
      gsap.to(rightCol, {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const next = (currentRef.current + 1) % quotes.length;
      animateToIndex(next, 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  function animateToIndex(nextIndex: number, dir: number) {
    if (!quoteRef.current || isAnimatingRef.current || nextIndex === currentRef.current) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.to(quoteRef.current, {
      x: dir * -40,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        currentRef.current = nextIndex;
        setCurrent(nextIndex);
      },
    }).fromTo(
      quoteRef.current,
      { x: dir * 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
    );
  }

  function goNext() {
    const next = (currentRef.current + 1) % quotes.length;
    animateToIndex(next, 1);
  }

  function goPrev() {
    const prev = currentRef.current === 0 ? quotes.length - 1 : currentRef.current - 1;
    animateToIndex(prev, -1);
  }

  function goTo(i: number) {
    if (i === currentRef.current) return;
    animateToIndex(i, i > currentRef.current ? 1 : -1);
  }

  const q = quotes[current];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-foreground">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <div className="qc-left">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Testimonials
            </p>
            <h2 className="font-heading font-bold text-display-md text-white mb-10">
              What they say about us
            </h2>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={goPrev}
                className="w-10 h-10 border border-white/20 rounded flex items-center justify-center text-white/60 hover:border-white/50 hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-2" role="tablist">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-px transition-all duration-300 ${
                      i === current ? "w-8 bg-accent" : "w-4 bg-white/20"
                    }`}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="w-10 h-10 border border-white/20 rounded flex items-center justify-center text-white/60 hover:border-white/50 hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right column */}
          <div
            className="qc-right"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-live="polite"
            aria-atomic="true"
          >
            <div ref={quoteRef}>
              <blockquote>
                <p className="font-body text-lg md:text-xl lg:text-2xl italic text-white/70 leading-relaxed mb-8">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer>
                  <cite className="not-italic">
                    <p className="font-heading font-bold text-sm text-white">
                      {q.name}
                    </p>
                    <p className="font-body text-xs text-white/40">
                      {q.role}, {q.location}
                    </p>
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
