"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import ApplyButton from "@/components/ApplyButton";

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
  const testimonialRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const heroEls = heroRef.current!.querySelectorAll(".hero-anim");
      gsap.set(heroEls, { y: 30, autoAlpha: 0 });
      gsap.to(heroEls, {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.3,
      });

      // Trust bar
      if (trustRef.current) {
        const trustEls = trustRef.current.querySelectorAll(".trust-item");
        gsap.set(trustEls, { y: 15, autoAlpha: 0 });
        gsap.to(trustEls, {
          y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: trustRef.current, start: "top 85%" },
        });
      }

      // Reality
      if (realityRef.current) {
        const realityEls = realityRef.current.querySelectorAll(".reality-anim");
        gsap.set(realityEls, { y: 25, autoAlpha: 0 });
        gsap.to(realityEls, {
          y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: realityRef.current, start: "top 75%" },
        });
      }

      // Pathway steps
      const stepEls = pathwayRef.current!.querySelectorAll(".pathway-step");
      gsap.set(stepEls, { y: 25, autoAlpha: 0 });
      stepEls.forEach((step, i) => {
        gsap.to(step, {
          y: 0, autoAlpha: 1, duration: 0.7, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: step, start: "top 88%" },
        });
      });

      // Pathway image
      const pathwayImg = pathwayRef.current!.querySelector(".pathway-image");
      if (pathwayImg) {
        gsap.set(pathwayImg, { clipPath: "inset(4% 4% 4% 4% round 0.5rem)", autoAlpha: 0 });
        gsap.to(pathwayImg, {
          clipPath: "inset(0% 0% 0% 0% round 0.5rem)", autoAlpha: 1,
          duration: 1.3, ease: "power3.inOut",
          scrollTrigger: { trigger: pathwayRef.current, start: "top 70%" },
        });
      }

      // Testimonial
      if (testimonialRef.current) {
        const tEls = testimonialRef.current.querySelectorAll(".test-anim");
        gsap.set(tEls, { y: 25, autoAlpha: 0 });
        gsap.to(tEls, {
          y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: testimonialRef.current, start: "top 75%" },
        });
      }

      // FAQ
      const faqEls = faqRef.current!.querySelectorAll(".faq-item");
      gsap.set(faqEls, { y: 15, autoAlpha: 0 });
      faqEls.forEach((item, i) => {
        gsap.to(item, {
          y: 0, autoAlpha: 1, duration: 0.6, delay: i * 0.06, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 92%" },
        });
      });

      // Bottom CTA
      const ctaEls = ctaRef.current!.querySelectorAll(".cta-anim");
      gsap.set(ctaEls, { y: 25, autoAlpha: 0 });
      gsap.to(ctaEls, {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
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
      <section ref={heroRef} className="relative min-h-[85vh] flex items-end overflow-hidden">
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

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 md:pb-20 pt-40">
          <div className="max-w-2xl">
            <p className="hero-anim font-body text-sm font-semibold text-yellow-400 uppercase tracking-[0.2em] mb-5">
              For nurses
            </p>
            <h1
              className="hero-anim font-heading font-bold text-white mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", lineHeight: "1.05", letterSpacing: "-0.02em" }}
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
            <div className="hero-anim flex flex-col sm:flex-row items-start gap-4">
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
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-8 md:gap-12">
              {[
                { value: "500+", label: "Nurses supported" },
                { value: "100%", label: "Employer retention" },
                { value: "95%", label: "Satisfaction rate" },
              ].map((stat) => (
                <div key={stat.label} className="trust-item text-center md:text-left">
                  <p className="font-heading font-bold text-2xl text-primary leading-none">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="trust-item flex items-center gap-3 bg-secondary-light/40 rounded-xl px-5 py-3">
              <img src="/testimonial-mentee.png" alt="Analyn" className="w-9 h-9 rounded-full object-cover shrink-0" />
              <div>
                <p className="font-body text-sm text-muted italic leading-snug max-w-xs">
                  &ldquo;Sheena&apos;s mentorship gave me the confidence and skills to thrive in Canadian healthcare.&rdquo;
                </p>
                <p className="font-body text-xs text-muted/70 mt-1 not-italic">Analyn, RN</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ THE REALITY ============ */}
      <section ref={realityRef} className="py-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-24">
            <div className="lg:col-span-5">
              <p className="reality-anim font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
                The reality
              </p>
              <h2 className="reality-anim font-heading font-bold text-display-md text-foreground">
                You&apos;re not starting over. But it can feel that way.
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="space-y-5 mb-8">
                {challenges.map((challenge) => (
                  <div key={challenge} className="reality-anim flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="font-body text-base text-muted leading-relaxed">
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
              <p className="reality-anim font-heading font-bold text-lg text-foreground">
                You don&apos;t have to figure it out alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ YOUR PATHWAY ============ */}
      <section ref={pathwayRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left — Steps */}
            <div className="lg:col-span-6">
              <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
                Your pathway
              </p>
              <h2 className="font-heading font-bold text-display-md text-foreground mb-12">
                From first questions to your first shift
              </h2>

              <div>
                {pathwaySteps.map((step, i) => (
                  <div
                    key={step.number}
                    className={`pathway-step flex gap-5 py-7 ${
                      i < pathwaySteps.length - 1 ? "border-b border-secondary/15" : ""
                    }`}
                  >
                    <span className="font-heading font-bold text-2xl text-primary/20 shrink-0 w-10">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">
                        {step.title}
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed mb-3">
                        {step.description}
                      </p>
                      <Link
                        href={step.href}
                        className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-300 group"
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
            </div>

            {/* Right — Image */}
            <div className="lg:col-span-6 flex items-center">
              <div className="pathway-image relative rounded-2xl overflow-hidden aspect-[4/5] w-full">
                <Image
                  src="/new2.png"
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

      {/* ============ TESTIMONIAL — Video cards ============ */}
      <section ref={testimonialRef} className="py-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="test-anim mb-14 md:mb-16">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Stories
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Hear from nurses like you
            </h2>
          </div>
        </div>

        <div className="test-anim overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-5 md:gap-6 pl-6 md:pl-12 pr-6 md:pr-12">
              {[
                { name: "Amara O.", role: "Registered Nurse, Toronto", initials: "AO" },
                { name: "Dr. Sarah Chen", role: "Director of Nursing, Vancouver", initials: "SC" },
                { name: "James M.", role: "ICU Nurse, Ottawa", initials: "JM" },
                { name: "Grace T.", role: "LPN, Calgary", initials: "GT" },
                { name: "Priya S.", role: "Nurse Manager, Montreal", initials: "PS" },
              ].map((t) => (
                <div
                  key={t.name}
                  className="group flex-shrink-0 relative rounded-lg border border-secondary/15 overflow-hidden cursor-pointer"
                  style={{ width: "clamp(280px, 30vw, 380px)", aspectRatio: "9/14" }}
                >
                  <div className="absolute inset-0 bg-secondary-light" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,174,228,0.3)_0%,transparent_70%)]" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-3 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="font-heading font-bold text-[10px] text-white">{t.initials}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-heading font-bold text-sm text-foreground truncate">{t.name}</p>
                        <p className="font-body text-xs text-muted truncate">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section ref={faqRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
                FAQ
              </p>
              <h2 className="font-heading font-bold text-display-md text-foreground mb-4">
                Common questions
              </h2>
              <p className="font-body text-sm text-muted leading-relaxed mb-6">
                Can&apos;t find what you&apos;re looking for? Book a consultation
                with our team.
              </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section ref={ctaRef} className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 scale-110">
          <Image
            src="/empty2.jpg"
            alt="Nurses collaborating"
            fill
            className="object-cover"
            sizes="100vw"
            style={{ willChange: "transform" }}
            id="candidates-cta-parallax-img"
          />
        </div>
        <div className="absolute inset-0 bg-foreground/80" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <p className="cta-anim font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Ready?
            </p>
            <h2 className="cta-anim font-heading font-bold text-display-md text-white mb-4">
              Your career in Canada starts with one step
            </h2>
            <p className="cta-anim font-body text-base text-white/55 leading-relaxed">
              Apply now and our team will reach out to guide you through
              the next steps.
            </p>
          </div>

          <div className="cta-anim flex flex-col sm:flex-row gap-4 shrink-0">
            <ApplyButton variant="white" />
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center border border-white/25 text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:border-white/50 transition-colors duration-300"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
