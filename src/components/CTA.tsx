"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll(".cta-animate");
      gsap.set(els, { y: 25, autoAlpha: 0 });
      gsap.to(els, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-section">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="bg-primary rounded-[2rem] md:rounded-[3rem] px-8 md:px-16 py-16 md:py-20 text-center relative overflow-hidden">
          {/* Subtle decorative elements - warm, not techy */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-white/[0.03] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-white/[0.03] translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="cta-animate font-body text-xs font-semibold text-white/35 uppercase tracking-[0.2em] mb-5">
              Start today
            </p>

            <h2 className="cta-animate font-heading font-black text-display-md text-white mb-5">
              Ready to begin your nursing career in Canada?
            </h2>

            <p className="cta-animate font-body text-base text-white/45 mb-10 max-w-lg mx-auto leading-relaxed">
              Whether you are a nurse looking for work or an employer looking
              for talent, we are here to help.
            </p>

            <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/candidates/assessment"
                className="inline-flex items-center justify-center bg-white text-primary font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-300"
              >
                Apply Now
              </Link>
              <Link
                href="/employers"
                className="inline-flex items-center justify-center border border-white/20 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:border-white/40 transition-colors duration-300"
              >
                Hire Qualified Staff
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
