"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import ApplyButton from "./ApplyButton";

gsap.registerPlugin(ScrollTrigger);

const nurseSteps = [
  { number: "01", title: "Apply", description: "Tell us about your background, credentials, and goals so we can map out your next steps." },
  { number: "02", title: "Mentorship", description: "Get paired with a nurse mentor who's already made the move to Canada." },
  { number: "03", title: "Preparation", description: "Credentialing support, exam prep, and career coaching to get you job-ready." },
  { number: "04", title: "Placement", description: "We match you with hospitals and clinics across Canada that need your skills." },
];

const employerSteps = [
  { number: "01", title: "Consultation", description: "Tell us about your staffing needs, timelines, and team." },
  { number: "02", title: "Screening", description: "We identify qualified, credentialed candidates from our network." },
  { number: "03", title: "Matching", description: "Nurses matched to your environment, culture, and requirements." },
  { number: "04", title: "Support", description: "Ongoing integration and retention support after placement." },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"nurse" | "employer">("nurse");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.set(".hiw-header > *", { y: 25, autoAlpha: 0 });
      gsap.to(".hiw-header > *", {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Cards
      const cards = sectionRef.current!.querySelectorAll(".hiw-card");
      gsap.set(cards, { y: 40, autoAlpha: 0 });
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: 0, autoAlpha: 1, duration: 0.9, delay: i * 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".hiw-cards", start: "top 80%" },
        });
      });

      // Steps
      const steps = sectionRef.current!.querySelectorAll(".hiw-step");
      gsap.set(steps, { y: 15, autoAlpha: 0 });
      gsap.to(steps, {
        y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: ".hiw-cards", start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-section pt-10 md:pt-14 bg-secondary-light/25">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="hiw-header max-w-2xl mb-8 sm:mb-14 md:mb-16">
          <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
            How it works
          </p>
          <h2 className="font-heading font-bold text-display-md text-foreground">
            A clear path for each side.
          </h2>
        </div>

        {/* Mobile tab toggle */}
        <div className="md:hidden mb-6 flex gap-1.5 bg-white border border-secondary/15 rounded-full p-1.5 max-w-sm">
          <button
            onClick={() => setActiveTab("nurse")}
            className={`flex-1 font-body text-sm font-semibold py-2.5 rounded-full transition-all duration-300 ${
              activeTab === "nurse"
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            For nurses
          </button>
          <button
            onClick={() => setActiveTab("employer")}
            className={`flex-1 font-body text-sm font-semibold py-2.5 rounded-full transition-all duration-300 ${
              activeTab === "employer"
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            For employers
          </button>
        </div>

        {/* Two pathway cards */}
        <div className="hiw-cards grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Nurse pathway */}
          <div className={`hiw-card bg-white rounded-lg overflow-hidden border border-secondary/15 ${activeTab === "nurse" ? "block" : "hidden md:block"}`}>
            <div className="hiw-image-nurse relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
              <Image
                src="/Satisfaction-rate.jpg"
                alt="Nurse in a clinical consultation"
                fill
                className="object-cover object-[center_10%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 sm:p-8 md:p-10">
              <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.08em] mb-6 sm:mb-8 hidden md:block">
                For nurses
              </p>
              <div className="space-y-5 sm:space-y-7 md:space-y-8 mb-8 md:mb-10">
                {nurseSteps.map((step) => (
                  <div key={step.number} className="hiw-step flex gap-4 sm:gap-5">
                    <span className="font-heading font-bold text-sm text-secondary pt-0.5 shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-foreground mb-1 sm:mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <ApplyButton variant="small" label="Apply now" />
            </div>
          </div>

          {/* Employer pathway */}
          <div className={`hiw-card bg-white rounded-lg overflow-hidden border border-secondary/15 ${activeTab === "employer" ? "block" : "hidden md:block"}`}>
            <div className="hiw-image-employer relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
              <Image
                src="/employer-partnership2.jpg"
                alt="Healthcare professional reviewing candidate qualifications"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 sm:p-8 md:p-10">
              <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-6 sm:mb-8 hidden md:block">
                For employers
              </p>
              <div className="space-y-5 sm:space-y-7 md:space-y-8 mb-8 md:mb-10">
                {employerSteps.map((step) => (
                  <div key={step.number} className="hiw-step flex gap-4 sm:gap-5">
                    <span className="font-heading font-bold text-sm text-secondary pt-0.5 shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-foreground mb-1 sm:mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/employers"
                className="inline-flex items-center justify-center font-body font-semibold text-sm px-7 py-3.5 rounded-full border-2 border-primary text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-0.5"
              >
                Partner with us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
