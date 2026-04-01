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
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      // Initial states
      gsap.set(".hero-label", { y: 20, autoAlpha: 0 });
      gsap.set(".hero-headline-line", { y: 60, autoAlpha: 0 });
      gsap.set(".hero-sub", { y: 20, autoAlpha: 0 });
      gsap.set(".hero-cta > *", { y: 16, autoAlpha: 0 });
      gsap.set(".hero-stat-item", { y: 20, autoAlpha: 0 });
      gsap.set(".hero-image-wrap", { scale: 0.92, autoAlpha: 0, clipPath: "inset(6% 6% 6% 6% round 0.5rem)" });
      gsap.set(".hero-trust", { y: 14, autoAlpha: 0 });

      // Main entrance timeline
      tl.to(".hero-label", { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" })
        .to(
          ".hero-headline-line",
          { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        )
        .to(".hero-sub", { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.5")
        .to(
          ".hero-cta > *",
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
          "-=0.4"
        )
        .to(
          ".hero-image-wrap",
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 0.5rem)",
            autoAlpha: 1,
            duration: 1.4,
            ease: "power3.inOut",
          },
          0.4
        )
        .to(
          ".hero-stat-item",
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 },
          "-=0.6"
        )
        .to(".hero-trust", { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.4");


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
      <div className="relative flex-1 flex items-start px-6 md:px-12 lg:px-20 pt-14">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
          {/* Left column - text */}
          <div className="lg:col-span-6 xl:col-span-6 lg:pl-2 xl:pl-4">
            {/* Label */}
            <p className="hero-label font-body text-xs font-semibold text-accent tracking-[0.12em] uppercase mb-8">
              Now placing nurses across Canada
            </p>

            {/* Headline */}
            <h1 className="hero-headline font-heading font-bold text-foreground mb-7">
              <span
                className="hero-headline-line block"
                style={{
                  fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.03em",
                }}
              >
                Internationally
              </span>
              <span
                className="hero-headline-line block"
                style={{
                  fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.03em",
                }}
              >
                educated nurse?
              </span>
              <span
                className="hero-headline-line block mt-2"
                style={{
                  fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="text-primary">Land your first</span>
              </span>
              <span
                className="hero-headline-line block"
                style={{
                  fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
                  lineHeight: "1.08",
                  letterSpacing: "-0.03em",
                }}
              >
                <span className="text-primary">Canadian</span> job.
              </span>
            </h1>

            {/* Subline */}
            <p className="hero-sub font-body text-base md:text-lg text-muted max-w-xl mb-9 leading-relaxed">
              We handle credentialing, immigration support, and
              employer matching, so you can focus on what you do best.
            </p>

            {/* CTAs */}
            <div className="hero-cta flex flex-col sm:flex-row items-start gap-4 mb-12">
              <Link
                href="/candidates/assessment"
                className="inline-flex items-center justify-center text-white font-body font-semibold text-base px-10 py-4 rounded-full bg-primary transition-all duration-300 hover:bg-accent hover:-translate-y-0.5"
              >
                Apply Now
              </Link>
              <Link
                href="/employers"
                className="inline-flex items-center justify-center text-primary font-body font-semibold text-base px-10 py-4 rounded-full border-2 border-primary transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-0.5"
              >
                Hire Qualified Staff
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 md:gap-10">
              {stats.map((stat, i) => (
                <div key={stat.label} className="hero-stat-item flex items-center gap-8 md:gap-10">
                  <div>
                    <p className="font-heading font-bold text-2xl md:text-3xl text-primary leading-none">
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

          {/* Right column - image */}
          <div className="lg:col-span-6 xl:col-span-6 pt-0 lg:pt-0">
            <div className="hero-image-wrap relative rounded-lg overflow-hidden h-full min-h-[500px] shadow-2xl shadow-foreground/8">
              <Image
                src="/hero-picture-ien2rn.jpg"
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
      <div className="hero-trust shrink-0 py-14 px-6 md:px-12 mt-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="border-t border-secondary/15 pt-10">
            <p className="font-body text-sm text-muted/70 uppercase tracking-[0.15em] text-center mb-8">
              Trusted by healthcare organizations across Canada
            </p>
            <div className="flex items-center justify-center gap-10 md:gap-20 opacity-60">
              {["Ontario Health", "BC Health", "Alberta HS", "Quebec CISSS"].map(
                (name) => (
                  <span
                    key={name}
                    className="font-heading font-bold text-base md:text-xl text-foreground whitespace-nowrap"
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
