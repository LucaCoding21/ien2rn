"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Apply online",
    description:
      "Tell us about your nursing background, licensing status, and career goals. It takes 2 minutes.",
  },
  {
    number: "02",
    title: "We build your plan",
    description:
      "Our team reviews your profile, connects you with mentorship and training if needed, and prepares you for placement.",
  },
  {
    number: "03",
    title: "Get matched",
    description:
      "We introduce you to employers who fit your skills, location preference, and career goals. You always have the final say.",
  },
  {
    number: "04",
    title: "Start working",
    description:
      "We support you through onboarding and beyond — your first day, your first month, and everything after.",
  },
];

const faqs = [
  {
    question: "Do I need to be licensed in Canada to apply?",
    answer:
      "No. We work with nurses at every stage — whether you're fully licensed, in the process, or just starting to explore. Apply and we'll figure out the right path together.",
  },
  {
    question: "Is there a fee?",
    answer:
      "Never. Our services are 100% free for nurses. Employers cover all placement costs.",
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
      "Absolutely. We match based on your preferences — location, facility type, shift preferences, and specialty area.",
  },
];

export default function CandidatesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      const heroEls = heroRef.current!.querySelectorAll(".hero-anim");
      gsap.set(heroEls, { y: 30, autoAlpha: 0 });
      gsap.to(heroEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.3,
      });

      // Trust bar
      if (trustRef.current) {
        const trustEls = trustRef.current.querySelectorAll(".trust-item");
        gsap.set(trustEls, { y: 15, autoAlpha: 0 });
        gsap.to(trustEls, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: trustRef.current, start: "top 85%" },
        });
      }

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

      // Testimonial
      if (testimonialRef.current) {
        const tEls = testimonialRef.current.querySelectorAll(".test-anim");
        gsap.set(tEls, { y: 25, autoAlpha: 0 });
        gsap.to(tEls, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: testimonialRef.current, start: "top 75%" },
        });
      }

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
      const ctaEls = ctaRef.current!.querySelectorAll(".cta-anim");
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
      {/* ============ HERO — Emotional, with a face ============ */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/1.jpg"
            alt="Internationally educated nurse in Canada"
            fill
            className="object-cover object-[center_25%]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 pb-16 md:pb-20 pt-40">
          <div className="max-w-2xl">
            <p className="hero-anim font-body text-sm font-semibold text-white/50 uppercase tracking-[0.2em] mb-5">
              For nurses
            </p>
            <h1
              className="hero-anim font-heading font-black text-white mb-6"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
              }}
            >
              You&apos;re a nurse.
              <br />
              Canada needs you.
              <br />
              Let&apos;s make it happen.
            </h1>
            <p className="hero-anim font-body text-base md:text-lg text-white/60 leading-relaxed max-w-md mb-8">
              We handle credentialing, immigration support, mentorship, and
              employer matching — so you can focus on what you do best.
            </p>
            <div className="hero-anim flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/candidates/assessment"
                className="group inline-flex items-center justify-center gap-2.5 text-foreground font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-white transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Apply Now
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
              <span className="font-body text-xs text-white/35 py-3.5">
                Free · Takes 2 minutes · No account needed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP — Instant credibility ============ */}
      <div ref={trustRef} className="bg-white border-b border-secondary/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-8 md:gap-12">
              {[
                { value: "500+", label: "Nurses placed" },
                { value: "50+", label: "Employer partners" },
                { value: "$0", label: "Cost to you" },
              ].map((stat) => (
                <div key={stat.label} className="trust-item text-center md:text-left">
                  <p className="font-heading font-black text-2xl text-primary leading-none">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="trust-item flex items-center gap-3 bg-secondary-light/40 rounded-xl px-5 py-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="font-heading font-bold text-xs text-white">AO</span>
              </div>
              <p className="font-body text-sm text-muted italic leading-snug max-w-xs">
                &ldquo;In four months, I was working full-time at a hospital in Toronto.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============ PROCESS — Visual, with image ============ */}
      <section ref={processRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left — Steps */}
            <div className="lg:col-span-6">
              <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                How it works
              </p>
              <h2 className="font-heading font-black text-display-md text-foreground mb-12">
                From application to your first shift
              </h2>

              <div>
                {steps.map((step, i) => (
                  <div
                    key={step.number}
                    className={`process-item flex gap-5 py-7 ${
                      i < steps.length - 1 ? "border-b border-secondary/15" : ""
                    }`}
                  >
                    <span className="font-heading font-black text-2xl text-primary/20 shrink-0 w-10">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Image */}
            <div className="lg:col-span-6 flex items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full">
                <Image
                  src="/2.jpg"
                  alt="Nurse preparing for Canadian healthcare career"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIAL — Social proof moment ============ */}
      <section ref={testimonialRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <svg
              className="test-anim w-10 h-10 text-secondary/40 mx-auto mb-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11.25 13.441 11.25 15.625 11.25 16.82 10.82 17.926 10.037 18.713 9.254 19.5 8.197 19.929 7.05 19.929c-1.33 0-2.386-.486-2.467-.608zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.986.179 3.645 1.93 3.645 4.114 0 1.195-.43 2.301-1.213 3.088-.783.787-1.84 1.216-2.987 1.216-1.33 0-2.386-.486-2.467-.608z" />
            </svg>
            <p className="test-anim font-body text-xl md:text-2xl text-foreground leading-snug font-light mb-8 max-w-2xl mx-auto">
              &ldquo;Moving to Canada felt very hard until I found ien2RN. They helped
              me with every step. In four months, I was working full-time at a
              hospital in Toronto.&rdquo;
            </p>
            <div className="test-anim flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="font-heading font-bold text-sm text-white">AO</span>
              </div>
              <div className="text-left">
                <p className="font-heading font-bold text-sm text-foreground">
                  Amara O.
                </p>
                <p className="font-body text-xs text-muted">
                  Registered Nurse, Toronto
                </p>
              </div>
            </div>

            {/* Supporting stats */}
            <div className="test-anim flex items-center justify-center gap-8 mt-10 pt-8 border-t border-secondary/15">
              {[
                "Permanent placement",
                "Temporary & contract",
                "ICU, ER, OR & specialty",
              ].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className="font-body text-sm text-muted">{type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section ref={faqRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left — heading */}
            <div className="lg:col-span-4">
              <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                FAQ
              </p>
              <h2 className="font-heading font-black text-display-md text-foreground mb-4">
                Common questions
              </h2>
              <p className="font-body text-sm text-muted leading-relaxed mb-6">
                Can&apos;t find what you&apos;re looking for? Book a free consultation
                with our team.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-300 group"
              >
                Book a consultation
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

            {/* Right — questions */}
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
                        openFaq === i
                          ? "bg-primary border-primary rotate-45"
                          : "group-hover:border-primary"
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
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA — Photo background ============ */}
      <section ref={ctaRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[400px] md:min-h-[450px]">
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src="/empty2.jpg"
                alt="Nurses collaborating"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center min-h-[400px] md:min-h-[450px] px-8 md:px-16 py-14">
              <div className="max-w-lg">
                <p className="cta-anim font-body text-xs font-semibold text-white/40 uppercase tracking-[0.2em] mb-5">
                  Ready?
                </p>
                <h2 className="cta-anim font-heading font-black text-display-md text-white mb-5">
                  Your career in Canada starts with one step
                </h2>
                <p className="cta-anim font-body text-base text-white/50 mb-8 leading-relaxed">
                  Apply now and our team will reach out to guide you through the
                  next steps. It&apos;s free, it&apos;s fast, and we&apos;ve got your back.
                </p>
                <Link
                  href="/candidates/assessment"
                  className="cta-anim group inline-flex items-center justify-center gap-2.5 text-foreground font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-white transition-all duration-300 hover:shadow-lg hover:shadow-white/15 hover:-translate-y-0.5"
                >
                  Apply Now
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
          </div>
        </div>
      </section>
    </main>
  );
}
