"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ApplyButton from "./ApplyButton";

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
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
        <div className="bg-secondary-light/40 rounded-[1.75rem] md:rounded-[3rem] px-6 sm:px-8 md:px-16 py-10 sm:py-14 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          <div className="max-w-lg">
            <h2 className="cta-banner-animate font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
              Ready to take the next step?
            </h2>
            <p className="cta-banner-animate font-body text-sm text-muted leading-relaxed">
              Whether you&apos;re a nurse seeking your next opportunity or an
              employer looking for qualified staff.
            </p>
          </div>

          <div className="cta-banner-animate flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <ApplyButton variant="small" />
            <Link
              href="/employers"
              className="inline-flex items-center justify-center border border-foreground/15 text-foreground font-body font-semibold text-sm px-7 py-3 rounded-full hover:border-primary hover:text-primary transition-all duration-300"
            >
              Hire Practice-Ready Staff
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
