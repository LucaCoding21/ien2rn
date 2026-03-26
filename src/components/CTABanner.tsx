"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll(".cta-banner-animate");
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
        <div className="bg-secondary-light/40 rounded-[2rem] md:rounded-[3rem] px-8 md:px-16 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="cta-banner-animate font-heading font-black text-2xl md:text-3xl text-foreground mb-3">
              Ready to take the{" "}
              <span className="serif-italic text-primary">next step?</span>
            </h2>
            <p className="cta-banner-animate font-body text-sm text-muted leading-relaxed">
              Whether you&apos;re a nurse seeking your next opportunity or an
              employer looking for qualified staff.
            </p>
          </div>

          <div className="cta-banner-animate flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/candidates"
              className="inline-flex items-center justify-center bg-primary text-white font-body font-semibold text-sm px-7 py-3 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              Find a Nursing Job
            </Link>
            <Link
              href="/employers"
              className="inline-flex items-center justify-center border border-foreground/15 text-foreground font-body font-semibold text-sm px-7 py-3 rounded-full hover:border-primary hover:text-primary transition-all duration-300"
            >
              Hire Qualified Staff
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
