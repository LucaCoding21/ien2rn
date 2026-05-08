"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import ApplyButton from "@/components/ApplyButton";
import VideoTestimonials from "@/components/VideoTestimonials";

gsap.registerPlugin(ScrollTrigger);

const challenges = [
  "Unclear next steps after arriving in Canada",
  "Overwhelmed by licensing exams and documentation",
  "No mentor or guide through the process",
  "Navigating it all alone in a new country",
];

const pathwaySteps = [
  {
    number: "01",
    title: "Get personalized guidance",
    description:
      "We review your background, credentials, and goals. Then we map out your next best steps with clarity.",
    cta: "Get started",
    href: "/consultation",
  },
  {
    number: "02",
    title: "Build your readiness",
    description:
      "Prepare with targeted courses and materials for language exams, competency assessments, and Canadian nursing practice.",
    cta: "Browse courses",
    href: "/learning/courses",
  },
  {
    number: "03",
    title: "Get matched",
    description:
      "We connect you with hospitals, clinics, and care homes across Canada that match your skills, preferences, and goals.",
    cta: "Learn more",
    href: "/candidates",
  },
  {
    number: "04",
    title: "Start your career",
    description:
      "From your first shift to long-term growth, we stay with you to make sure the transition sticks.",
    cta: "Apply now",
    href: "/candidates/assessment",
  },
];

const faqs = [
  {
    question: "Do I need to be licensed in Canada to apply?",
    answer:
      "No. We work with nurses at every stage, whether you're fully licensed, in the process, or just starting to explore. Apply and we'll figure out the right path together.",
  },
  {
    question: "Is there a fee?",
    answer:
      "Our initial consultation and guidance are free. Some courses and preparation programs have fees, which we share upfront so there are no surprises.",
  },
  {
    question: "How long does it take to get placed?",
    answer:
      "It depends on where you are in your journey. Nurses who are already licensed can be placed within weeks. If you need more preparation, we work alongside you until you're ready.",
  },
  {
    question: "What types of facilities do you place nurses in?",
    answer:
      "Hospitals, clinics, long-term care homes, and specialty facilities across all Canadian provinces.",
  },
  {
    question: "Can I choose where I want to work?",
    answer:
      "Absolutely. We match based on your preferences: location, facility type, shift preferences, and specialty area.",
  },
];

export default function CandidatesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const realityRef = useRef<HTMLElement>(null);
  const pathwayRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const heroEls = heroRef.current!.querySelectorAll(".hero-anim");
      gsap.set(heroEls, { y: 30, autoAlpha: 0 });
      gsap.to(heroEls, {
        y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.04, ease: "power2.out", delay: 0.15,
      });

      // Trust bar
      if (trustRef.current) {
        const trustEls = trustRef.current.querySelectorAll(".trust-item");
        gsap.set(trustEls, { y: 15, autoAlpha: 0 });
        gsap.to(trustEls, {
          y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.04, ease: "power2.out",
          scrollTrigger: { trigger: trustRef.current, start: "top 85%" },
        });
      }

      // Reality
      if (realityRef.current) {
        const realityEls = realityRef.current.querySelectorAll(".reality-anim");
        realityEls.forEach((el, i) => {
          const isChallenge = el.closest(".space-y-5") !== null;
          if (isChallenge) {
            // Odd items from left, even items from right
            const xOffset = i % 2 === 0 ? -20 : 20;
            gsap.set(el, { x: xOffset, autoAlpha: 0 });
            gsap.to(el, {
              x: 0, autoAlpha: 1, duration: 0.5, delay: i * 0.08, ease: "power2.out",
              scrollTrigger: { trigger: realityRef.current, start: "top 75%" },
            });
          } else {
            gsap.set(el, { y: 25, autoAlpha: 0 });
            gsap.to(el, {
              y: 0, autoAlpha: 1, duration: 0.5, delay: i * 0.08, ease: "power2.out",
              scrollTrigger: { trigger: realityRef.current, start: "top 75%" },
            });
          }
        });
      }

      // Pathway steps
      const stepEls = pathwayRef.current!.querySelectorAll(".pathway-step");
      gsap.set(stepEls, { y: 25, autoAlpha: 0 });
      stepEls.forEach((step, i) => {
        gsap.to(step, {
          y: 0, autoAlpha: 1, duration: 0.4, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: step, start: "top 88%" },
        });
      });

      // Pathway image (mobile + desktop variants share the class)
      const pathwayImgs = pathwayRef.current!.querySelectorAll(".pathway-image");
      pathwayImgs.forEach((img) => {
        gsap.set(img, { clipPath: "inset(100% 0 0 0)", opacity: 0 });
        gsap.to(img, {
          clipPath: "inset(0% 0 0 0)", autoAlpha: 1,
          duration: 0.6, ease: "power3.inOut",
          scrollTrigger: { trigger: img, start: "top 75%" },
        });
      });

      // FAQ
      const faqEls = faqRef.current!.querySelectorAll(".faq-item");
      gsap.set(faqEls, { y: 15, autoAlpha: 0 });
      faqEls.forEach((item, i) => {
        gsap.to(item, {
          y: 0, autoAlpha: 1, duration: 0.4, delay: i * 0.06, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 92%" },
        });
      });

      // Bottom CTA
      const ctaEls = ctaRef.current!.querySelectorAll(".cta-anim");
      gsap.set(ctaEls, { y: 25, autoAlpha: 0 });
      gsap.to(ctaEls, {
        y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.04, ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 75%" },
      });

      gsap.fromTo(
        "#candidates-cta-parallax-img",
        { y: "-10%" },
        {
          y: "10%", ease: "none",
          scrollTrigger: { trigger: ctaRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative min-h-[75svh] sm:min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/1.webp"
            alt="Internationally educated nurse in Canada"
            fill
            className="object-cover object-[center_25%]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/20" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 pb-12 sm:pb-16 md:pb-20 pt-32 sm:pt-36 md:pt-40">
          <div className="max-w-2xl">
            <p className="hero-anim font-body text-xs sm:text-sm font-semibold text-yellow-300 uppercase tracking-[0.08em] mb-4 sm:mb-5">
              For nurses
            </p>
            <h1
              className="hero-anim font-heading font-bold text-white mb-5 sm:mb-6"
              style={{ fontSize: "clamp(2rem, 8vw, 3.75rem)", lineHeight: "1.05", letterSpacing: "-0.02em" }}
            >
              You&apos;re a nurse.
              <br />
              Canada needs you.
              <br />
              Let&apos;s make it happen.
            </h1>
            <p className="hero-anim font-body text-base md:text-lg text-white/60 leading-relaxed max-w-md mb-8">
              ien2RN guides internationally educated nurses through licensing, preparation, and placement in Canada.
            </p>
            <div className="hero-anim flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4">
              <ApplyButton variant="white" />
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center font-body font-semibold text-sm px-8 py-3.5 rounded-full border border-white/30 text-white transition-all duration-300 hover:bg-white/10"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <div ref={trustRef} className="bg-white border-b border-secondary/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 py-7 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-3 gap-3 w-full sm:w-auto sm:flex sm:items-center sm:gap-8 md:gap-12">
              {[
                { value: "500+", label: "Nurses supported" },
                { value: "100%", label: "Employer retention" },
                { value: "95%", label: "Satisfaction rate" },
              ].map((stat) => (
                <div key={stat.label} className="trust-item text-center md:text-left min-w-0">
                  <p className="font-heading font-bold text-xl sm:text-2xl text-primary leading-none">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-muted mt-1 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="trust-item hidden md:flex items-center gap-3 bg-secondary-light/40 rounded-xl px-4 sm:px-5 py-3 w-full md:w-auto">
              <Image src="/testimonial-mentee.webp" alt="Analyn" width={36} height={36} className="rounded-full object-cover shrink-0" />
              <div>
                <p className="font-body text-xs sm:text-sm text-muted italic leading-snug max-w-xs">
                  &ldquo;Sheena&apos;s mentorship gave me the confidence and skills to thrive in Canadian healthcare.&rdquo;
                </p>
                <p className="font-body text-xs text-muted mt-1 not-italic">Analyn, RN</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ THE REALITY ============ */}
      <section ref={realityRef} className="py-12 sm:py-section">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-24">
            <div className="lg:col-span-5 text-center sm:text-left">
              <p className="reality-anim font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-3 sm:mb-4">
                The reality
              </p>
              <h2 className="reality-anim font-heading font-bold text-display-md text-foreground">
                <span className="hidden sm:inline">You&apos;re not starting over. But it can feel that way.</span>
                <span className="sm:hidden">It can feel like starting over.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Mobile: two short sentences, centered */}
              <div className="sm:hidden text-center">
                <p className="reality-anim font-body text-sm text-muted leading-relaxed">
                  Unclear next steps, overwhelming exams, and no guide.
                </p>
                <p className="reality-anim font-body text-sm text-muted leading-relaxed mt-2">
                  You don&apos;t have to do it alone.
                </p>
              </div>
              {/* Desktop: bullet list */}
              <div className="hidden sm:block space-y-5 mb-8">
                {challenges.map((challenge) => (
                  <div key={challenge} className="reality-anim flex items-start gap-4">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <p className="font-body text-base text-muted leading-relaxed">
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
              <p className="reality-anim font-heading font-bold text-base sm:text-lg text-foreground hidden sm:block">
                You don&apos;t have to figure it out alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ YOUR PATHWAY ============ */}
      <section ref={pathwayRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">

          {/* Mobile: image as top banner */}
          <div className="lg:hidden mb-8">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-3">
              Your pathway
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground mb-6">
              From first questions to your first shift
            </h2>
            <div className="pathway-image relative rounded-2xl overflow-hidden aspect-[16/10] w-full">
              <Image
                src="/new2.webp"
                alt="Nurse preparing for Canadian healthcare career"
                fill
                loading="lazy"
                className="object-cover object-[center_15%]"
                sizes="100vw"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Left — Steps */}
            <div className="lg:col-span-6">
              {/* Desktop heading (mobile heading is above with the banner) */}
              <div className="hidden lg:block">
                <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
                  Your pathway
                </p>
                <h2 className="font-heading font-bold text-display-md text-foreground mb-12">
                  From first questions to your first shift
                </h2>
              </div>

              <div>
                {pathwaySteps.map((step, i) => (
                  <div
                    key={step.number}
                    className={`pathway-step flex gap-4 sm:gap-6 py-6 sm:py-8 lg:hover:bg-secondary-light/20 rounded-lg px-3 -mx-3 transition-all duration-300 ${
                      i < pathwaySteps.length - 1 ? "border-b border-secondary/15" : ""
                    }`}
                  >
                    <span className="font-heading font-bold text-xl sm:text-2xl text-primary lg:text-primary/20 shrink-0 w-9 sm:w-10">
                      {step.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-foreground mb-1 sm:mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed lg:mb-3">
                        {step.description}
                      </p>
                      <Link
                        href={step.href}
                        className="hidden lg:inline-flex items-center gap-1.5 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-300 group"
                      >
                        {step.cta}
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: single CTA at the end */}
              <div className="lg:hidden mt-8 flex justify-end">
                <ApplyButton variant="small" label="Start your pathway" />
              </div>
            </div>

            {/* Right — Image (desktop only, mobile shows it as a banner above) */}
            <div className="hidden lg:col-span-6 lg:flex items-center">
              <div className="pathway-image relative rounded-2xl overflow-hidden aspect-[4/5] max-h-[600px] w-full">
                <Image
                  src="/new2.webp"
                  alt="Nurse preparing for Canadian healthcare career"
                  fill
                  loading="lazy"
                  className="object-cover object-[center_15%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL — Video cards ============ */}
      <VideoTestimonials />

      {/* ============ FAQ ============ */}
      <section ref={faqRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Header — centered on mobile */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
                FAQ
              </p>
              <h2 className="font-heading font-bold text-display-md text-foreground mb-4">
                Common questions
              </h2>
              <p className="font-body text-sm text-muted leading-relaxed lg:mb-6">
                Can&apos;t find what you&apos;re looking for? Book a consultation
                with our team.
              </p>
              <Link
                href="/consultation"
                className="hidden lg:inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-300 group"
              >
                Book a consultation
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="lg:col-span-8">
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
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
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

              {/* Book a consultation — after Q&A (mobile only; desktop has it in left column) */}
              <div className="flex lg:hidden justify-center mt-8">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-300 group"
                >
                  Book a consultation
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section ref={ctaRef} className="relative py-20 sm:py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 scale-100 md:scale-110">
          <Image
            src="/empty2.webp"
            alt="Nurses collaborating"
            fill
            loading="lazy"
            className="object-cover"
            sizes="100vw"
            style={{ willChange: "transform" }}
            id="candidates-cta-parallax-img"
          />
        </div>
        <div className="absolute inset-0 bg-foreground/80" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24 flex flex-col items-center text-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:text-left lg:gap-10">
          <div className="max-w-2xl">
            <p className="cta-anim font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Ready?
            </p>
            <h2 className="cta-anim font-heading font-bold text-display-md text-white mb-4">
              Your career in Canada starts with one step
            </h2>
            <p className="cta-anim font-body text-base text-white/75 leading-relaxed">
              Apply now and our team will reach out to guide you through
              the next steps.
            </p>
          </div>

          <div className="cta-anim flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-md sm:max-w-none mx-auto lg:shrink-0">
            <ApplyButton variant="white" className="w-full sm:w-auto" />
            <Link
              href="/consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-white/25 text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:border-white/50 transition-colors duration-300"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
