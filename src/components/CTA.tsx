"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ApplyButton from "./ApplyButton";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll(".cta-animate");
      gsap.set(els, { y: 25, autoAlpha: 0 });
      gsap.to(els, {
        y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.04, ease: "power2.out",
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
    <section ref={sectionRef} className="relative py-20 sm:py-24 md:py-36 overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0 scale-100 md:scale-110">
        <Image
          src="/cta-section.jpg"
          alt="Nurses working in a Canadian hospital"
          fill
          loading="lazy"
          className="object-cover object-[center_30%]"
          sizes="100vw"
          style={{ willChange: "transform" }}
          id="cta-parallax-img"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/80" />

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24 flex flex-col items-center text-center gap-8">

        {/* Text */}
        <div className="max-w-2xl">
          <p className="cta-animate font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
            Start today
          </p>
          <h2 className="cta-animate font-heading font-bold text-display-md text-white mb-4">
            Ready to begin your nursing career in Canada?
          </h2>
          <p className="cta-animate font-body text-base md:text-lg text-white/75 leading-relaxed">
            Whether you are a nurse looking for work or an employer looking for talent, we are here to help.
          </p>
        </div>

        {/* CTAs */}
        <div className="cta-animate flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
          <ApplyButton variant="white" className="w-full sm:w-auto" />
          <Link
            href="/employers"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-white/25 text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:border-white/50 transition-colors duration-300"
          >
            Hire Qualified Staff
          </Link>
        </div>

      </div>
    </section>
  );
}
