"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    title: "Filling positions in remote locations?",
    description:
      "Rural and northern facilities face unique recruitment challenges. We source nurses ready to serve where they're needed most.",
  },
  {
    title: "Workforce recruitment and retention?",
    description:
      "High turnover drains resources. Our mentored nurses integrate faster and stay longer because they're supported from day one.",
  },
  {
    title: "Finding competent, permanent nursing staff?",
    description:
      "Every nurse in our network has been upskilled and mentored to meet Canadian clinical standards before placement.",
  },
  {
    title: "Unsustainable costs of temporary staffing agencies?",
    description:
      "Temp agencies are expensive and short-term. We deliver permanent, sustainable placements at a fraction of the cost.",
  },
];

const pillars = [
  {
    title: "Solution Beyond Recruitment",
    image: "/hero-nurse.jpg",
    imagePosition: "center 30%",
    items: [
      "Top-tier nursing talent",
      "Nurse-mentored workforce",
      "Canadian nursing competent & upskilled staff",
    ],
  },
  {
    title: "Recruit, Retain & Sustain",
    image: "/2.jpg",
    imagePosition: "center 20%",
    items: [
      "Local and global nurses",
      "Continuing education & professional development",
      "Sustainable permanent placements & customizable solutions",
    ],
  },
  {
    title: "Strengthened Capacity & Capability",
    image: "/empty2.jpg",
    imagePosition: "center",
    items: [
      "Focused courses and workshops",
      "Complimentary onboarding & training",
      "Reinforced consultation with IEN nurse mentors",
    ],
  },
];

export default function EmployersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const painRef = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text
      const heroEls = heroRef.current!.querySelectorAll(".emp-hero-anim");
      gsap.set(heroEls, { y: 30, autoAlpha: 0 });
      gsap.to(heroEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.3,
      });

      // Hero image
      gsap.set(".emp-hero-image", { autoAlpha: 0, x: 40 });
      gsap.to(".emp-hero-image", {
        autoAlpha: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });

      // Pain points — header
      const painHeader = painRef.current!.querySelectorAll(".pain-header > *");
      gsap.set(painHeader, { y: 25, autoAlpha: 0 });
      gsap.to(painHeader, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: painRef.current, start: "top 75%" },
      });

      // Pain points — image
      gsap.set(".pain-image", {
        clipPath: "inset(4% 4% 4% 4% round 1.5rem)",
        autoAlpha: 0,
      });
      gsap.to(".pain-image", {
        clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
        autoAlpha: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".pain-image", start: "top 80%" },
      });

      // Pain points — items
      const painEls = painRef.current!.querySelectorAll(".pain-item");
      gsap.set(painEls, { x: 20, autoAlpha: 0 });
      painEls.forEach((el, i) => {
        gsap.to(el, {
          x: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Pillars
      const pillarHeader = pillarsRef.current!.querySelectorAll(".pillars-header > *");
      gsap.set(pillarHeader, { y: 25, autoAlpha: 0 });
      gsap.to(pillarHeader, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: pillarsRef.current, start: "top 75%" },
      });

      const pillarEls = pillarsRef.current!.querySelectorAll(".pillar-card");
      gsap.set(pillarEls, { y: 40, autoAlpha: 0 });
      pillarEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Contact
      const contactEls = contactRef.current!.querySelectorAll(".contact-anim");
      gsap.set(contactEls, { y: 30, autoAlpha: 0 });
      contactEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: contactRef.current, start: "top 70%" },
        });
      });

      // Contact parallax
      gsap.fromTo("#employers-contact-parallax-img",
        { y: "-10%" },
        {
          y: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── Section 1 — Hero ── */}
      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-16">

            {/* Left — text */}
            <div className="flex-1 min-w-0">

              {/* Eyebrow */}
              <p className="emp-hero-anim font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-6">
                For Healthcare Employers
              </p>

              {/* Headline */}
              <h1
                className="emp-hero-anim font-heading font-bold text-foreground mb-6"
                style={{ fontSize: "clamp(2.25rem, 4vw, 3.75rem)", lineHeight: "1.04", letterSpacing: "-0.03em" }}
              >
                Build a workforce
                <br />
                <span className="text-primary">that stays.</span>
              </h1>

              {/* Sub-headline */}
              <p className="emp-hero-anim font-body text-base text-muted leading-relaxed mb-8 max-w-[400px]">
                Mentored, upskilled IENs — clinically prepared and culturally
                integrated — placed permanently where you need them most.
              </p>

              {/* Trust bullets */}
              <ul className="emp-hero-anim space-y-3 mb-10">
                {[
                  "Nurses vetted & upskilled to Canadian clinical standards",
                  "Permanent placements — not costly temp agency rotations",
                  "Rural & remote facilities served across Canada",
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

              {/* CTAs */}
              <div className="emp-hero-anim flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/employers/request-staff"
                  className="group inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  Partner With Us
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

              {/* Stat strip */}
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

            {/* Right — square image with floating cards */}
            <div className="emp-hero-image relative w-full lg:w-[520px] xl:w-[580px] shrink-0">
              {/* Square image */}
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

              {/* Floating card — top left (overlaps image) */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl shadow-foreground/10 px-4 py-3.5 max-w-[190px] border border-secondary/20">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-body text-xs font-semibold text-muted uppercase tracking-wide">Permanent</span>
                </div>
                <p className="font-heading font-bold text-foreground text-base leading-tight">
                  No more agency churn
                </p>
                <p className="font-body text-xs text-muted/60 mt-1">Long-term placements</p>
              </div>

              {/* Floating card — bottom right (overlaps image) */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-white rounded-2xl px-4 py-3.5 max-w-[210px]">
                <p className="font-body text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">The ien2RN difference</p>
                <p className="font-heading font-bold text-white text-sm leading-snug">
                  Mentored from day one — not just recruited
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 2 — Pain Points (split: image left, list right) ── */}
      <section ref={painRef} className="py-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="pain-header max-w-2xl mb-14 md:mb-16">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              We understand your challenges
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Is your organisation struggling with&hellip;
            </h2>
          </div>

          {/* Landscape image */}
          <div className="pain-image relative rounded-3xl overflow-hidden aspect-[21/9] mb-12 shadow-xl shadow-foreground/5">
            <Image
              src="/aboutus2.jpg"
              alt="Healthcare team in a Canadian facility"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
          </div>

          {/* Pain points grid */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
            {painPoints.map((point, i) => (
              <div
                key={point.title}
                className={`pain-item flex gap-5 py-7 ${i < 2 ? "border-b border-secondary/15" : ""}`}
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

          <div className="pain-item mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/employers/request-staff"
              className="inline-flex items-center justify-center font-body font-semibold text-sm px-7 py-3.5 rounded-full bg-primary text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              Partner With Us
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

      {/* ── Section 3 — Benefit Pillars (cards with images) ── */}
      <section ref={pillarsRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="pillars-header max-w-2xl mb-14 md:mb-16">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Benefits of partnering with us
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              We have the sustainable solution for you
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="pillar-card group bg-offwhite rounded-2xl overflow-hidden border border-secondary/10"
              >
                {/* Card image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectPosition: pillar.imagePosition }}
                  />
                </div>

                {/* Card content */}
                <div className="p-6 md:p-8">
                  <div className="h-1 w-10 bg-primary rounded-full mb-5" />
                  <h3 className="font-heading font-bold text-lg text-foreground mb-5">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-3">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-primary shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        <span className="font-body text-sm text-muted leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 — Contact ── */}
      <section ref={contactRef} className="relative py-28 md:py-36 overflow-hidden">
        {/* Background image with parallax */}
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

        {/* Content */}
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
          <p className="contact-anim font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
            Get in touch
          </p>
          <h2 className="contact-anim font-heading font-bold text-display-md text-white mb-10 max-w-lg">
            Let&apos;s build your workforce
          </h2>

          <div className="contact-anim grid sm:grid-cols-2 gap-5 max-w-2xl">
            {/* Phone */}
            <a
              href="tel:+16042295549"
              className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white mb-5 group-hover:bg-white group-hover:text-foreground transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <p className="font-heading font-bold text-base text-white mb-1">IEN upskilling workshops?</p>
              <p className="font-body text-xs text-white/40 mb-4">Phone Call or WhatsApp</p>
              <p className="font-heading font-bold text-sm text-white group-hover:text-secondary transition-colors duration-300">
                +1-604-229-5549
              </p>
            </a>

            {/* Email */}
            <a
              href="mailto:NurseMentor@ien2rn.org"
              className="group rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/15 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white mb-5 group-hover:bg-white group-hover:text-foreground transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="font-heading font-bold text-base text-white mb-1">Ready-to-care workforce?</p>
              <p className="font-body text-xs text-white/40 mb-4">Email or SMS</p>
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
