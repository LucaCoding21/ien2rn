"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    title: "IEN Nurse Mentorship",
    description:
      "1-on-1 mentorship with IEN nurses who've navigated the Canadian system. Personalized guidance for clinical practice, workplace challenges, and career growth.",
    image: "/2.jpg",
    imagePosition: "center 20%",
  },
  {
    title: "Career Accelerator Program",
    description:
      "Resume building, interview prep, and career coaching from a team with 100+ years of combined healthcare leadership experience.",
    image: "/1.jpg",
    imagePosition: "center 30%",
  },
];

const popularResources = [
  {
    title: "CBA & SLA Study Guide",
    category: "Assessment Prep",
  },
  {
    title: "Canadian Healthcare System Overview",
    category: "Orientation",
  },
  {
    title: "Resume Template for IENs",
    category: "Career",
  },
  {
    title: "Medication Math Reference Sheet",
    category: "Clinical Reference",
  },
];

export default function LearningPage() {
  const heroRef = useRef<HTMLElement>(null);
  const flagshipRef = useRef<HTMLElement>(null);
  const moreRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const heroEls = heroRef.current!.querySelectorAll(".learn-hero-anim");
      gsap.set(heroEls, { y: 30, autoAlpha: 0 });
      gsap.to(heroEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.3,
      });

      // Flagship
      const flagshipHeader = flagshipRef.current!.querySelectorAll(".flagship-header > *");
      gsap.set(flagshipHeader, { y: 25, autoAlpha: 0 });
      gsap.to(flagshipHeader, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: flagshipRef.current, start: "top 75%" },
      });

      gsap.set(".flagship-image", {
        clipPath: "inset(4% 4% 4% 4% round 1.5rem)",
        autoAlpha: 0,
      });
      gsap.to(".flagship-image", {
        clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
        autoAlpha: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".flagship-image", start: "top 80%" },
      });

      const flagshipContent = flagshipRef.current!.querySelectorAll(".flagship-content > *");
      gsap.set(flagshipContent, { x: 30, autoAlpha: 0 });
      gsap.to(flagshipContent, {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: flagshipRef.current, start: "top 65%" },
      });

      // More programs + resources
      const moreEls = moreRef.current!.querySelectorAll(".more-anim");
      gsap.set(moreEls, { y: 40, autoAlpha: 0 });
      moreEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Social proof
      const proofEls = proofRef.current!.querySelectorAll(".proof-anim");
      gsap.set(proofEls, { y: 25, autoAlpha: 0 });
      gsap.to(proofEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: proofRef.current, start: "top 70%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── Section 1 — Hero (candidates-style full-image bg) ── */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] flex items-end overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/empty2.jpg"
            alt="Nurse mentorship and training session"
            fill
            className="object-cover object-[center_30%]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 pb-16 md:pb-20 pt-40">
          <div className="max-w-2xl">
            <p className="learn-hero-anim font-body text-sm font-semibold text-white/50 uppercase tracking-[0.2em] mb-5">
              Learning & Mentorship
            </p>
            <h1
              className="learn-hero-anim font-heading font-black text-white mb-6"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
              }}
            >
              Built by IEN nurses,
              <br />
              for IEN nurses.
            </h1>
            <p className="learn-hero-anim font-body text-base md:text-lg text-white/60 leading-relaxed max-w-md mb-8">
              CBA & SLA boot camps, 1-on-1 mentorship, and upskilling workshops —
              everything you need to succeed in Canadian healthcare.
            </p>
            <div className="learn-hero-anim flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/learning/courses"
                className="group inline-flex items-center justify-center gap-2.5 text-foreground font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-white transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Explore Programs
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/learning/resources"
                className="group inline-flex items-center gap-2 font-body font-medium text-sm text-white/50 hover:text-white transition-colors duration-300 py-3.5"
              >
                Free Resources
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 — Flagship: CBA & SLA Boot Camp ── */}
      <section ref={flagshipRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="flagship-header max-w-2xl mb-14 md:mb-16">
            <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
              Flagship program
            </p>
            <h2 className="font-heading font-black text-display-md text-foreground">
              CBA & SLA Boot Camp
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Image */}
            <div className="lg:col-span-7">
              <div className="flagship-image relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-foreground/5">
                <Image
                  src="/photo3.jpg"
                  alt="Nurses in CBA & SLA boot camp training"
                  fill
                  className="object-cover object-[center_40%]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-5 flex flex-col justify-center flagship-content">
              <p className="font-body text-base text-muted leading-relaxed mb-8">
                Our intensive boot camp prepares you for the Competency-Based
                Assessment and Substantially Equivalent Competency assessment with
                in-hospital simulation, hands-on practice, and mentorship from
                nurses who&apos;ve passed it themselves.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "In-hospital simulation & hands-on practice",
                  "Mentored by IEN nurses who passed the CBA/SLA",
                  "Study plans tailored to your gaps",
                  "Small cohorts for personalized attention",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
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
                    <span className="font-body text-sm text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-secondary/15">
                <div>
                  <p className="font-heading font-black text-2xl text-primary leading-none">
                    12
                  </p>
                  <p className="font-body text-xs text-muted mt-1">weeks</p>
                </div>
                <div className="w-px h-10 bg-secondary/20" />
                <div>
                  <p className="font-heading font-black text-2xl text-primary leading-none">
                    All
                  </p>
                  <p className="font-body text-xs text-muted mt-1">levels</p>
                </div>
                <div className="w-px h-10 bg-secondary/20" />
                <div>
                  <p className="font-heading font-black text-2xl text-primary leading-none">
                    Live
                  </p>
                  <p className="font-body text-xs text-muted mt-1">in-person</p>
                </div>
              </div>

              <Link
                href="/learning/courses"
                className="group inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 self-start"
              >
                Join the Next Cohort
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3 — More Programs + Popular Resources ── */}
      <section ref={moreRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left — More programs */}
            <div className="lg:col-span-7">
              <div className="more-anim mb-10">
                <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                  More programs
                </p>
                <h2 className="font-heading font-black text-display-sm text-foreground">
                  Mentorship & workshops
                </h2>
              </div>

              <div className="space-y-6">
                {programs.map((program) => (
                  <Link
                    key={program.title}
                    href="/learning/courses"
                    className="more-anim group flex flex-col sm:flex-row gap-5 bg-white rounded-2xl overflow-hidden border border-secondary/10 hover:border-primary/20 transition-colors duration-300"
                  >
                    <div className="relative sm:w-48 aspect-[16/10] sm:aspect-auto shrink-0 overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="200px"
                        style={{ objectPosition: program.imagePosition }}
                      />
                    </div>
                    <div className="p-5 sm:py-5 sm:pr-5 sm:pl-0 flex flex-col justify-center">
                      <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {program.title}
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </Link>
                ))}

                <Link
                  href="/learning/courses"
                  className="more-anim inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-300 group mt-2"
                >
                  View all programs
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right — Popular resources */}
            <div className="lg:col-span-5">
              <div className="more-anim mb-10">
                <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                  Free resources
                </p>
                <h2 className="font-heading font-black text-display-sm text-foreground">
                  Popular downloads
                </h2>
              </div>

              <div className="space-y-4">
                {popularResources.map((resource) => (
                  <Link
                    key={resource.title}
                    href="/learning/resources"
                    className="more-anim group flex items-center gap-4 bg-white rounded-xl border border-secondary/10 p-4 hover:border-primary/20 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary-light/60 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                        {resource.title}
                      </h3>
                      <p className="font-body text-xs text-muted">
                        {resource.category}
                      </p>
                    </div>
                    <span className="font-body text-[10px] font-semibold text-primary bg-secondary-light/50 px-2.5 py-1 rounded-full uppercase tracking-wide shrink-0">
                      Free
                    </span>
                  </Link>
                ))}

                <Link
                  href="/learning/resources"
                  className="more-anim inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-300 group mt-2"
                >
                  View all resources
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4 — Social Proof ── */}
      <section ref={proofRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[450px] md:min-h-[500px]">
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src="/aboutus2.jpg"
                alt="Healthcare team"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center min-h-[450px] md:min-h-[500px] px-8 md:px-16 py-14">
              <div className="max-w-xl">
                <svg
                  className="proof-anim w-8 h-8 text-white/20 mb-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11.25 13.441 11.25 15.625 11.25 16.82 10.82 17.926 10.037 18.713 9.254 19.5 8.197 19.929 7.05 19.929c-1.33 0-2.386-.486-2.467-.608zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.986.179 3.645 1.93 3.645 4.114 0 1.195-.43 2.301-1.213 3.088-.783.787-1.84 1.216-2.987 1.216-1.33 0-2.386-.486-2.467-.608z" />
                </svg>
                <p className="proof-anim font-body text-xl md:text-2xl text-white leading-snug font-light mb-8">
                  &ldquo;The CBA boot camp changed everything. I walked into my
                  assessment confident because I&apos;d already practiced every
                  scenario with my mentor. Passed on the first attempt.&rdquo;
                </p>
                <div className="proof-anim flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                    <span className="font-heading font-bold text-sm text-white">
                      MR
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-white">
                      Maria R.
                    </p>
                    <p className="font-body text-xs text-white/40">
                      Passed CBA on first attempt
                    </p>
                  </div>
                </div>

                <Link
                  href="/learning/courses"
                  className="proof-anim group inline-flex items-center justify-center gap-2.5 text-foreground font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-white transition-all duration-300 hover:shadow-lg hover:shadow-white/15 hover:-translate-y-0.5 mt-10"
                >
                  Start Your Training
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
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
