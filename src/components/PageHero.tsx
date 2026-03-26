"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PageHeroProps {
  label: string;
  heading: React.ReactNode;
  description: string;
}

export default function PageHero({ label, heading, description }: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".page-hero-label", { y: 12, autoAlpha: 0 });
      gsap.set(".page-hero-heading", { y: 35, autoAlpha: 0 });
      gsap.set(".page-hero-desc", { y: 15, autoAlpha: 0 });
      gsap.set(".page-hero-line", { scaleX: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.3 });

      tl.to(".page-hero-label", { y: 0, autoAlpha: 1, duration: 0.7 })
        .to(".page-hero-heading", { y: 0, autoAlpha: 1, duration: 0.9 }, "-=0.4")
        .to(".page-hero-desc", { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.4")
        .to(
          ".page-hero-line",
          { scaleX: 1, duration: 1, ease: "power3.inOut" },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <p className="page-hero-label font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
            {label}
          </p>
          <h1 className="page-hero-heading font-heading font-black text-display-lg text-foreground mb-6">
            {heading}
          </h1>
          <p className="page-hero-desc font-body text-lg text-muted leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {/* Subtle accent line */}
        <div className="page-hero-line h-px bg-gradient-to-r from-primary/25 via-secondary/20 to-transparent mt-12 origin-left" />
      </div>
    </section>
  );
}
