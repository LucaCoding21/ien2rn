"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Nurses placed" },
  { value: "95%", label: "Satisfaction rate" },
  { value: "50+", label: "Employer partners" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay: 0.4,
      });

      gsap.set(".hero-label", { y: 15, autoAlpha: 0 });
      gsap.set(".hero-headline-line", { y: 50, autoAlpha: 0 });
      gsap.set(".hero-sub", { y: 15, autoAlpha: 0 });
      gsap.set(".hero-cta > *", { y: 12, autoAlpha: 0 });
      gsap.set(".hero-stat-item", { y: 15, autoAlpha: 0 });
      gsap.set(".hero-image-wrap", { clipPath: "inset(8% 8% 8% 8% round 1.5rem)", autoAlpha: 0 });
      gsap.set(".hero-trust", { y: 10, autoAlpha: 0 });

      tl.to(".hero-label", { y: 0, autoAlpha: 1, duration: 0.7 })
        .to(
          ".hero-headline-line",
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
          "-=0.4"
        )
        .to(".hero-sub", { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.4")
        .to(
          ".hero-cta > *",
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06 },
          "-=0.3"
        )
        .to(
          ".hero-image-wrap",
          {
            clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
            autoAlpha: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          0.6
        )
        .to(
          ".hero-stat-item",
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 },
          "-=0.5"
        )
        .to(".hero-trust", { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col"
    >
      {/* Spacer for nav */}
      <div className="h-28 shrink-0" />

      {/* Main content */}
      <div className="relative flex-1 flex items-start px-6 md:px-12 lg:px-20 pt-4 md:pt-8">
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left column — text */}
          <div className="lg:col-span-6 xl:col-span-7 pt-2 lg:pt-8">
            {/* Label */}
            <div className="hero-label inline-flex items-center gap-2.5 bg-secondary-light/60 rounded-full px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-body text-xs font-semibold text-primary tracking-wide uppercase">
                Now placing nurses across Canada
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline font-heading font-black text-foreground mb-7">
              <span
                className="hero-headline-line block"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.03em",
                }}
              >
                Internationally
              </span>
              <span
                className="hero-headline-line block"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.03em",
                }}
              >
                educated nurse?
              </span>
              <span
                className="hero-headline-line block mt-2"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="serif-italic text-primary">Land your first</span>
              </span>
              <span
                className="hero-headline-line block"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="serif-italic text-primary">Canadian</span> job.
              </span>
            </h1>

            {/* Subline */}
            <p className="hero-sub font-body text-base md:text-lg text-muted max-w-md mb-9 leading-relaxed">
              We handle credential assessment, NCLEX prep, and employer
              matching — so you can focus on what you do best.
            </p>

            {/* CTAs */}
            <div className="hero-cta flex flex-col sm:flex-row items-start gap-4 mb-12">
              <Link
                href="/candidates/assessment"
                className="group inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                Find Your Next Role
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/employers"
                className="group inline-flex items-center gap-2 font-body font-medium text-sm text-muted hover:text-primary transition-colors duration-300 py-3.5"
              >
                Hire Qualified Staff
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 md:gap-10">
              {stats.map((stat, i) => (
                <div key={stat.label} className="hero-stat-item flex items-center gap-8 md:gap-10">
                  <div>
                    <p className="font-heading font-black text-2xl md:text-3xl text-primary leading-none">
                      {stat.value}
                    </p>
                    <p className="font-body text-xs text-muted mt-1">
                      {stat.label}
                    </p>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-10 bg-secondary/30" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — image */}
          <div className="lg:col-span-6 xl:col-span-5 pt-0 lg:pt-0">
            <div className="hero-image-wrap relative rounded-3xl overflow-hidden aspect-[3/4] max-h-[620px] shadow-2xl shadow-foreground/8">
              <Image
                src="/hero-nurse.jpg"
                alt="Internationally educated nurse working in a Canadian healthcare setting"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              {/* Soft warm gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="hero-trust shrink-0 py-10 px-6 md:px-12 mt-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="border-t border-secondary/15 pt-8">
            <p className="font-body text-[10px] text-muted/40 uppercase tracking-[0.15em] text-center mb-4">
              Trusted by healthcare organizations across Canada
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-14 opacity-20">
              {["Ontario Health", "BC Health", "Alberta HS", "Quebec CISSS"].map(
                (name) => (
                  <span
                    key={name}
                    className="font-heading font-bold text-xs md:text-sm text-foreground whitespace-nowrap"
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
