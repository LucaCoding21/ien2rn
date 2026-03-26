"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

const placements = [
  {
    title: "Permanent Placement",
    description: "Full-time positions at hospitals, clinics, and long-term care facilities across Canada.",
  },
  {
    title: "Temporary & Contract",
    description: "Short-term and contract roles for nurses who want flexibility or are exploring options.",
  },
  {
    title: "Specialty Nursing",
    description: "ICU, ER, OR, and other specialized units where your advanced skills are in high demand.",
  },
];

const steps = [
  {
    number: "01",
    title: "Complete your assessment",
    description: "Answer a few questions about your nursing background, licensing status, and career goals so we can understand where you are in your journey.",
  },
  {
    number: "02",
    title: "Create your profile",
    description: "Once assessed, you'll create a profile in our system with your credentials, experience, and preferences.",
  },
  {
    number: "03",
    title: "We prepare & match you",
    description: "We review your credentials, help with NCLEX prep if needed, and connect you with healthcare facilities that fit your skills.",
  },
  {
    number: "04",
    title: "Start your new role",
    description: "We support you through onboarding and beyond, making sure your transition is as smooth as possible.",
  },
];

const faqs = [
  {
    question: "Do I need to be licensed in Canada to start?",
    answer: "No. Our assessment helps us understand where you are — whether you're fully licensed, in the process, or just starting. We work with nurses at every stage.",
  },
  {
    question: "What happens after the assessment?",
    answer: "If you're ready for placement, you'll create a profile and we start matching. If you need more preparation, we'll point you to courses and resources to get you there.",
  },
  {
    question: "Is there a fee for candidates?",
    answer: "There is no fee for nurses. Our recruitment services are completely free for candidates. Employers cover all placement costs.",
  },
  {
    question: "How long does the process take?",
    answer: "It varies depending on where you are in your licensing journey. For nurses who are already licensed, placement can happen within weeks. For those still in process, we work alongside you until you are ready.",
  },
  {
    question: "What types of facilities do you place nurses in?",
    answer: "We work with hospitals, clinics, long-term care homes, and specialty facilities across all Canadian provinces.",
  },
  {
    question: "Can I choose where I want to work?",
    answer: "Absolutely. We match you based on your preferences — location, facility type, shift preferences, and specialty area. You always have the final say.",
  },
];

export default function CandidatesPage() {
  const placementsRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Placements
      const cards = placementsRef.current!.querySelectorAll(".placement-row");
      gsap.set(cards, { x: 40, autoAlpha: 0 });
      cards.forEach((card, i) => {
        gsap.to(card, {
          x: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      // Process
      const stepEls = processRef.current!.querySelectorAll(".process-item");
      gsap.set(stepEls, { y: 25, autoAlpha: 0 });
      stepEls.forEach((step, i) => {
        gsap.to(step, {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: step, start: "top 88%" },
        });
      });

      // FAQ
      const faqEls = faqRef.current!.querySelectorAll(".faq-item");
      gsap.set(faqEls, { y: 15, autoAlpha: 0 });
      faqEls.forEach((item, i) => {
        gsap.to(item, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          delay: i * 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 92%" },
        });
      });

      // Bottom CTA
      const ctaEls = ctaRef.current!.querySelectorAll(".profile-cta > *");
      gsap.set(ctaEls, { y: 25, autoAlpha: 0 });
      gsap.to(ctaEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 75%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <PageHero
        label="For Candidates"
        heading={
          <>
            Your next chapter in{" "}
            <span className="serif-italic text-primary">Canadian healthcare</span>{" "}
            starts here
          </>
        }
        description="We help internationally educated nurses navigate the path to meaningful careers in Canada — from credential assessment to your first day on the job."
      />

      {/* Hero CTA — Assessment first */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 -mt-2 mb-4">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link
            href="/candidates/assessment"
            className="group inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
          >
            Check Your Eligibility
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <span className="font-body text-xs text-muted py-3.5">
            Takes 2 minutes · Free · No account needed
          </span>
        </div>
      </div>

      {/* Placement Types */}
      <section ref={placementsRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-14">
            <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
              What we offer
            </p>
            <h2 className="font-heading font-black text-display-md text-foreground">
              Placements that match your{" "}
              <span className="serif-italic text-primary">goals</span>
            </h2>
          </div>

          <div className="space-y-4">
            {placements.map((placement, i) => (
              <div
                key={placement.title}
                className="placement-row flex items-center gap-6 md:gap-10 p-6 md:p-8 rounded-2xl bg-secondary-light/30 hover:bg-secondary-light/50 transition-colors duration-300 group"
              >
                <span className="font-heading font-black text-3xl md:text-4xl text-secondary/40 shrink-0 w-14 text-center group-hover:text-primary/30 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {placement.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {placement.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-secondary/40 shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 hidden md:block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            ))}
          </div>

          {/* Inline CTA */}
          <div className="mt-10 pt-8 border-t border-secondary/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-muted">
              See which placements you qualify for
            </p>
            <Link
              href="/candidates/assessment"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-300 group"
            >
              Take the assessment
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Process — Assessment is step 1 now */}
      <section ref={processRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-14">
            <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
              Our process
            </p>
            <h2 className="font-heading font-black text-display-md text-foreground">
              How we get you{" "}
              <span className="serif-italic text-primary">working</span>
            </h2>
          </div>

          <div className="max-w-3xl">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`process-item grid grid-cols-12 gap-4 md:gap-8 py-8 ${
                  i < steps.length - 1 ? "border-b border-secondary/20" : ""
                }`}
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-heading font-black text-3xl text-primary/20">
                    {step.number}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-11">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Inline CTA — start at step 1 */}
          <div className="max-w-3xl mt-10">
            <Link
              href="/candidates/assessment"
              className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <p className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors duration-300">
                  Start with the assessment
                </p>
                <p className="font-body text-xs text-muted mt-0.5">
                  It takes 2 minutes and helps us understand how to support you best.
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-14">
            <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
              FAQ
            </p>
            <h2 className="font-heading font-black text-display-md text-foreground">
              Common{" "}
              <span className="serif-italic text-primary">questions</span>
            </h2>
          </div>

          <div className="max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item border-b border-secondary/20">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                >
                  <h3 className="font-heading font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full border border-secondary/30 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                      openFaq === i ? "bg-primary border-primary rotate-45" : "group-hover:border-primary"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-colors duration-300 ${
                        openFaq === i ? "text-white" : "text-muted"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    openFaq === i ? "max-h-48 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="font-body text-sm text-muted leading-relaxed max-w-2xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Inline CTA after FAQ */}
          <div className="max-w-3xl mt-10 bg-secondary-light/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="font-body text-sm text-foreground">
                <span className="font-semibold">No fees, ever.</span>{" "}
                Our services are 100% free for candidates.
              </p>
            </div>
            <Link
              href="/candidates/assessment"
              className="inline-flex items-center justify-center gap-2 text-white font-body font-semibold text-sm px-6 py-2.5 rounded-full bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 shrink-0"
            >
              Get Started
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA — Assessment first */}
      <section ref={ctaRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="profile-cta bg-foreground rounded-[2rem] md:rounded-[3rem] px-8 md:px-16 py-16 md:py-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-white/[0.02] -translate-y-1/2 translate-x-1/3" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="font-body text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-5">
                Ready to start?
              </p>
              <h2 className="font-heading font-black text-display-md text-white mb-5">
                Find out if you&apos;re ready for{" "}
                <span className="serif-italic">placement</span>
              </h2>
              <p className="font-body text-base text-white/40 mb-10 max-w-lg mx-auto leading-relaxed">
                Take our quick assessment to see where you stand. If you&apos;re
                ready, we&apos;ll get you into our system right away. If not,
                we&apos;ll show you exactly how to get there.
              </p>
              <Link
                href="/candidates/assessment"
                className="inline-flex items-center justify-center gap-2.5 text-foreground font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-white hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
              >
                Start Your Assessment
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
