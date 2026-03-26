"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

export default function LearningPage() {
  const gatewayRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gateway cards — asymmetric reveal
      const cards = gatewayRef.current!.querySelectorAll(".gateway-card");
      cards.forEach((card, i) => {
        gsap.set(card, { y: 50, autoAlpha: 0 });
        gsap.to(card, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });

      // Features
      const featureEls = featuresRef.current!.querySelectorAll(".feature-item");
      gsap.set(featureEls, { y: 20, autoAlpha: 0 });
      featureEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <PageHero
        label="Learning"
        heading={
          <>
            Grow your skills with{" "}
            <span className="serif-italic text-primary">professional development</span>
          </>
        }
        description="Access courses and downloadable resources designed for healthcare professionals. Whether you're preparing for exams or expanding your knowledge, we've got you covered."
      />

      {/* Gateway — Asymmetric cards (7/5 split) */}
      <section ref={gatewayRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-6">
            {/* Courses — larger card with image */}
            <Link
              href="/learning/courses"
              className="gateway-card md:col-span-7 group block"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5">
                <Image
                  src="/hero-nurse.jpg"
                  alt="Professional development courses"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
              <span className="font-body text-[10px] font-semibold text-primary uppercase tracking-[0.15em]">
                Courses
              </span>
              <h3 className="font-heading font-black text-xl md:text-2xl text-foreground mt-1.5 mb-2 group-hover:text-primary transition-colors duration-300">
                View Courses
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed max-w-md mb-3">
                Browse professional development courses — from NCLEX prep to
                clinical skills. Delivered through our external learning platform.
              </p>
              <span className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary">
                Browse courses
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            {/* Resources — smaller card with primary bg */}
            <Link
              href="/learning/resources"
              className="gateway-card md:col-span-5 group block bg-primary rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-white/[0.04] -translate-y-1/3 translate-x-1/4" />
              <div className="relative z-10">
                <span className="font-body text-[10px] font-semibold text-white/35 uppercase tracking-[0.15em]">
                  Resources
                </span>
                <h3 className="font-heading font-black text-xl md:text-2xl text-white mt-1.5 mb-3">
                  Download Resources
                </h3>
                <p className="font-body text-sm text-white/50 leading-relaxed max-w-sm">
                  Study guides, reference sheets, and career materials. Free and paid downloads for healthcare professionals.
                </p>
              </div>
              <span className="relative z-10 inline-flex items-center gap-2 font-body font-semibold text-sm text-white mt-6 group-hover:gap-3 transition-all duration-300">
                View resources
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features — Icon list */}
      <section ref={featuresRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                Why learn with us
              </p>
              <h2 className="font-heading font-black text-display-md text-foreground mb-4">
                Built by nurses, for{" "}
                <span className="serif-italic text-primary">nurses</span>
              </h2>
              <p className="font-body text-base text-muted leading-relaxed">
                Our learning materials are developed by experienced healthcare
                professionals who understand what it takes to succeed in
                Canadian healthcare.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {[
                  { value: "10+", label: "Courses available", desc: "From NCLEX prep to leadership" },
                  { value: "50+", label: "Downloadable resources", desc: "Study guides, references, templates" },
                  { value: "1,000+", label: "Learners enrolled", desc: "Across all programs" },
                  { value: "4.8/5", label: "Average rating", desc: "From course completions" },
                ].map((item) => (
                  <div key={item.label} className="feature-item">
                    <p className="font-heading font-black text-3xl text-primary leading-none mb-1">
                      {item.value}
                    </p>
                    <p className="font-heading font-bold text-sm text-foreground mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-body text-xs text-muted">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
