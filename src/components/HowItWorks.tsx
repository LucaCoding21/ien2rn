"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Tell us about yourself",
    description:
      "Fill out a short form about your nursing background and career goals.",
  },
  {
    number: "02",
    title: "We build your plan",
    description:
      "We check your credentials, prep you for the NCLEX, and get your resume ready.",
  },
  {
    number: "03",
    title: "Start working",
    description:
      "We connect you with employers and support you through your first day and beyond.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const headerEls = sectionRef.current!.querySelectorAll(".hiw-header > *");
      gsap.set(headerEls, { y: 25, autoAlpha: 0 });
      gsap.to(headerEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Steps
      const stepEls = sectionRef.current!.querySelectorAll(".hiw-step");
      gsap.set(stepEls, { y: 35, autoAlpha: 0 });
      stepEls.forEach((step, i) => {
        gsap.to(step, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        });
      });

      // Image
      const img = sectionRef.current!.querySelector(".hiw-image");
      gsap.set(img, { clipPath: "inset(6% 6% 6% 6% round 1.5rem)", autoAlpha: 0 });
      gsap.to(img, {
        clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
        autoAlpha: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: img, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-section bg-secondary-light/25">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header — centered */}
        <div className="hiw-header text-center max-w-2xl mx-auto mb-16">
          <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
            How it works
          </p>
          <h2 className="font-heading font-black text-display-md text-foreground">
            Three steps to your{" "}
            <span className="serif-italic text-primary">new career</span>
          </h2>
        </div>

        {/* Horizontal steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, i) => (
            <div key={step.number} className="hiw-step text-center md:text-left">
              {/* Number + connector */}
              <div className="flex items-center justify-center md:justify-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="font-heading font-bold text-sm text-white">
                    {step.number}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-secondary/40" />
                )}
              </div>

              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                {step.title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed max-w-xs mx-auto md:mx-0">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Large editorial image */}
        <div className="hiw-image relative rounded-3xl overflow-hidden aspect-[21/9] max-h-[420px]">
          <Image
            src="/hero-nurse.jpg"
            alt="Nurses collaborating in a Canadian healthcare setting"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />

          {/* Subtle overlay badge */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 flex items-center gap-3 shadow-lg shadow-black/5">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-foreground leading-tight">
                500+ nurses placed
              </p>
              <p className="font-body text-[11px] text-muted">
                Across all Canadian provinces
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
