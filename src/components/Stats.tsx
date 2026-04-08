"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 500, suffix: "+", label: "Nurses placed in Canadian healthcare" },
  { number: 100, suffix: "%", label: "Employer retention rate" },
  { number: 95, suffix: "%", label: "Candidate satisfaction rate" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the entire section
      gsap.from(sectionRef.current!.querySelectorAll(".stat-item"), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Counter animation
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        el.textContent = stats[i].number.toString();

        gsap.from(el, {
          innerText: 0,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Animate the divider lines
      gsap.from(sectionRef.current!.querySelectorAll(".stat-divider"), {
        scaleY: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-section">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-10 sm:gap-12 md:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-item relative flex">
              {/* Divider */}
              {i > 0 && (
                <div className="stat-divider hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-20 bg-secondary/60 origin-top" />
              )}

              <div className={`${i > 0 ? "md:pl-16" : ""} ${i < stats.length - 1 ? "md:pr-16" : ""}`}>
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    ref={(el) => {
                      numberRefs.current[i] = el;
                    }}
                    className="font-heading font-bold text-display-lg text-primary"
                  >
                    0
                  </span>
                  <span className="font-heading font-bold text-display-sm text-primary">
                    {stat.suffix}
                  </span>
                </div>
                <p className="font-body text-base text-muted max-w-[240px] leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
