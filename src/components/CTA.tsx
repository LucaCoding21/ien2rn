"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll(".cta-animate");
      gsap.set(els, { y: 25, autoAlpha: 0 });
      gsap.to(els, {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Parallax on background image
      gsap.fromTo("#cta-parallax-img",
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0 scale-110">
        <Image
          src="/cta-section.jpg"
          alt="Nurses working in a Canadian hospital"
          fill
          className="object-cover object-[center_30%]"
          sizes="100vw"
          style={{ willChange: "transform" }}
          id="cta-parallax-img"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/80" />

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row lg:items-center justify-between gap-10">

        {/* Left — text */}
        <div className="max-w-2xl">
          <p className="cta-animate font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
            Start today
          </p>
          <h2 className="cta-animate font-heading font-bold text-display-md text-white mb-4">
            Ready to begin your nursing career in Canada?
          </h2>
          <p className="cta-animate font-body text-base text-white/55 leading-relaxed">
            Whether you are a nurse looking for work or an employer looking for talent, we are here to help.
          </p>
        </div>

        {/* Right — CTAs */}
        <div className="cta-animate flex flex-col sm:flex-row gap-4 shrink-0">
          <Link
            href="/candidates/assessment"
            className="inline-flex items-center justify-center bg-white text-primary font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/90 transition-colors duration-300"
          >
            Apply Now
          </Link>
          <Link
            href="/employers"
            className="inline-flex items-center justify-center border border-white/25 text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:border-white/50 transition-colors duration-300"
          >
            Hire Qualified Staff
          </Link>
        </div>

      </div>
    </section>
  );
}
