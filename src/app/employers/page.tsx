"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const challenges = [
  {
    title: "Workforce shortages putting pressure on your team",
    description:
      "Open positions strain existing staff and compromise patient care. You need qualified nurses, not more job postings.",
  },
  {
    title: "Concerns about practice readiness",
    description:
      "International credentials don't always translate to Canadian clinical settings. You need nurses prepared for your environment, not just qualified on paper.",
  },
  {
    title: "Communication and cultural adaptation",
    description:
      "Language barriers and unfamiliarity with Canadian workplace norms create friction. Patients and teams feel the impact.",
  },
  {
    title: "High onboarding costs and early turnover",
    description:
      "Investing in a new hire only to lose them within months is expensive. Retention starts before placement, not after.",
  },
];

const approachSteps = [
  {
    title: "Rigorous vetting",
    image: "/employer-partnership2.jpg",
    imagePosition: "center",
    description: "We assess beyond credentials.",
    items: [
      "Practice readiness for Canadian settings",
      "Communication and language capability",
      "Professional conduct and work ethic",
      "Commitment to long-term integration",
    ],
  },
  {
    title: "Pre-employment preparation",
    image: "/2.jpg",
    imagePosition: "center 20%",
    description: "Before placement, every candidate receives:",
    items: [
      "Cultural and practice environment orientation",
      "Workplace expectation and systems training",
      "Mentorship from nurses with lived experience",
    ],
  },
  {
    title: "Ongoing retention support",
    image: "/photo3.jpg",
    imagePosition: "center",
    description: "Our involvement continues after placement.",
    items: [
      "Integration guidance through the first months",
      "Continued mentorship and check-ins",
      "Support that reduces early attrition risk",
    ],
  },
];

export default function EmployersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const challengeRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      const heroEls = heroRef.current!.querySelectorAll(".emp-hero-anim");
      gsap.set(heroEls, { y: 30, autoAlpha: 0 });
      gsap.to(heroEls, {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", delay: 0.3,
      });

      // Hero image
      gsap.set(".emp-hero-image", { autoAlpha: 0, x: 40 });
      gsap.to(".emp-hero-image", {
        autoAlpha: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.4,
      });

      // Challenge header
      const challengeHeader = challengeRef.current!.querySelectorAll(".challenge-header > *");
      gsap.set(challengeHeader, { y: 25, autoAlpha: 0 });
      gsap.to(challengeHeader, {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: challengeRef.current, start: "top 75%" },
      });

      // Challenge image
      gsap.set(".challenge-image", { clipPath: "inset(4% 4% 4% 4% round 1.5rem)", autoAlpha: 0 });
      gsap.to(".challenge-image", {
        clipPath: "inset(0% 0% 0% 0% round 1.5rem)", autoAlpha: 1,
        duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: ".challenge-image", start: "top 80%" },
      });

      // Challenge items
      const challengeEls = challengeRef.current!.querySelectorAll(".challenge-item");
      gsap.set(challengeEls, { x: 20, autoAlpha: 0 });
      challengeEls.forEach((el, i) => {
        gsap.to(el, {
          x: 0, autoAlpha: 1, duration: 0.7, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Approach header
      const approachHeader = approachRef.current!.querySelectorAll(".approach-header > *");
      gsap.set(approachHeader, { y: 25, autoAlpha: 0 });
      gsap.to(approachHeader, {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: approachRef.current, start: "top 75%" },
      });

      // Approach cards
      const approachCards = approachRef.current!.querySelectorAll(".approach-card");
      gsap.set(approachCards, { y: 40, autoAlpha: 0 });
      approachCards.forEach((el, i) => {
        gsap.to(el, {
          y: 0, autoAlpha: 1, duration: 0.8, delay: i * 0.12, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Contact
      const contactEls = contactRef.current!.querySelectorAll(".contact-anim");
      gsap.set(contactEls, { y: 30, autoAlpha: 0 });
      contactEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0, autoAlpha: 1, duration: 0.8, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: contactRef.current, start: "top 70%" },
        });
      });

      gsap.fromTo(
        "#employers-contact-parallax-img",
        { y: "-10%" },
        {
          y: "10%", ease: "none",
          scrollTrigger: { trigger: contactRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-16">
            {/* Left */}
            <div className="flex-1 min-w-0">
              <p className="emp-hero-anim font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-6">
                For Healthcare Employers
              </p>

              <h1
                className="emp-hero-anim font-heading font-bold text-foreground mb-6"
                style={{ fontSize: "clamp(2.25rem, 4vw, 3.75rem)", lineHeight: "1.04", letterSpacing: "-0.03em" }}
              >
                Build a workforce
                <br />
                <span className="text-primary">that stays.</span>
              </h1>

              <p className="emp-hero-anim font-body text-base text-muted leading-relaxed mb-8 max-w-[400px]">
                Mentored, upskilled IENs who are clinically prepared and culturally
                integrated. Placed permanently where you need them most.
              </p>

              <ul className="emp-hero-anim space-y-3 mb-10">
                {[
                  "Nurses vetted and upskilled to Canadian clinical standards",
                  "Permanent placements, not costly temp agency rotations",
                  "Rural and remote facilities served across Canada",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="font-body text-sm text-muted leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="emp-hero-anim flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/employers/request-staff"
                  className="group inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  Request Qualified Nurses
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/consultation"
                  className="inline-flex items-center justify-center gap-2 font-body font-medium text-sm text-foreground border border-foreground/20 px-8 py-3.5 rounded-full hover:border-foreground/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Book a Consultation
                </Link>
              </div>

              <div className="emp-hero-anim hidden sm:flex items-center gap-8 mt-12 pt-8 border-t border-secondary/20">
                {[
                  { value: "95%", label: "Placement retention" },
                  { value: "48h", label: "Avg. response time" },
                  { value: "10+", label: "Provinces served" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-heading font-bold text-xl text-foreground">{value}</p>
                    <p className="font-body text-xs text-muted/60">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image with floating cards */}
            <div className="emp-hero-image relative w-full lg:w-[520px] xl:w-[580px] shrink-0">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-foreground/10">
                <Image
                  src="/employer-partnership.jpg"
                  alt="Healthcare employer partnership"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 580px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
              </div>

              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl shadow-foreground/10 px-4 py-3.5 whitespace-nowrap border border-secondary/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-body text-xs font-semibold text-muted uppercase tracking-wide">Long-term placements</span>
                </div>
                <p className="font-heading font-bold text-foreground text-base leading-tight whitespace-normal max-w-[140px]">
                  Nurses who grow with your team
                </p>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-2xl px-4 py-3.5 max-w-[210px]">
                <p className="font-body text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">The ien2RN difference</p>
                <p className="font-heading font-bold text-white text-sm leading-snug">
                  Mentored from day one. Not just recruited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section ref={challengeRef} className="py-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="challenge-header max-w-2xl mb-14 md:mb-16">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              The challenge
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground mb-8">
              The talent exists. The gap is integration.
            </h2>
            <Link
              href="/employers/request-staff"
              className="inline-flex items-center justify-center font-body font-semibold text-sm px-7 py-3.5 rounded-full bg-primary text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Request staff
            </Link>
          </div>

          <div className="challenge-image relative rounded-3xl overflow-hidden aspect-[21/9] mb-12 shadow-xl shadow-foreground/5">
            <Image
              src="/whoweare.jpg"
              alt="Diverse nursing team in a Canadian hospital"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
            {challenges.map((point, i) => (
              <div
                key={point.title}
                className={`challenge-item flex gap-5 py-7 ${i < 2 ? "border-b border-secondary/15" : ""}`}
              >
                <span className="font-heading font-bold text-3xl text-primary/15 leading-none shrink-0 w-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">
                    {point.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="challenge-item font-heading font-bold text-lg text-foreground mt-10 text-center">
            Hiring internationally educated nurses should solve staffing problems, not create new ones.
          </p>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section ref={approachRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="approach-header max-w-2xl mb-14 md:mb-16">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Our approach
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground mb-4">
              We prepare nurses, not just profiles.
            </h2>
            <p className="font-body text-base text-muted leading-relaxed">
              Most recruitment focuses on supply. We focus on readiness, confidence, and long-term success in your environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {approachSteps.map((step) => (
              <div
                key={step.title}
                className="approach-card group bg-offwhite rounded-2xl overflow-hidden border border-secondary/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectPosition: step.imagePosition }}
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="h-1 w-10 bg-primary rounded-full mb-5" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed mb-5">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="font-body text-sm text-muted leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="approach-card mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/employers/request-staff"
              className="inline-flex items-center justify-center font-body font-semibold text-sm px-7 py-3.5 rounded-full bg-primary text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              Request Qualified Nurses
            </Link>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center font-body font-semibold text-sm px-7 py-3.5 rounded-full border border-foreground/20 text-foreground transition-all duration-300 hover:border-foreground/40 hover:-translate-y-0.5"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section ref={contactRef} className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 scale-110">
          <Image
            src="/3.jpg"
            alt="Employer partnership meeting"
            fill
            className="object-cover"
            sizes="100vw"
            style={{ willChange: "transform" }}
            id="employers-contact-parallax-img"
          />
        </div>
        <div className="absolute inset-0 bg-foreground/80" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
          <p className="contact-anim font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
            Get in touch
          </p>
          <h2 className="contact-anim font-heading font-bold text-display-md text-white mb-10 max-w-lg">
            Let&apos;s build your workforce
          </h2>

          <div className="contact-anim grid sm:grid-cols-2 gap-5 max-w-2xl">
            <a
              href="tel:+16042295549"
              className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white mb-5 group-hover:bg-white group-hover:text-foreground transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <p className="font-heading font-bold text-base text-white mb-1">Call us directly</p>
              <p className="font-body text-xs text-white/40 mb-4">Phone or WhatsApp</p>
              <p className="font-heading font-bold text-sm text-white group-hover:text-secondary transition-colors duration-300">
                +1-604-229-5549
              </p>
            </a>

            <a
              href="mailto:NurseMentor@ien2rn.org"
              className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white mb-5 group-hover:bg-white group-hover:text-foreground transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="font-heading font-bold text-base text-white mb-1">Send us a message</p>
              <p className="font-body text-xs text-white/40 mb-4">Email</p>
              <p className="font-heading font-bold text-sm text-white group-hover:text-secondary transition-colors duration-300">
                NurseMentor@ien2rn.org
              </p>
            </a>
          </div>

          <Link
            href="/employers/request-staff"
            className="contact-anim group inline-flex items-center gap-2 font-body font-semibold text-sm text-white/60 hover:text-white mt-8 transition-colors duration-300"
          >
            Or submit a staffing request
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
