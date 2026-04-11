"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const curriculum = [
  {
    week: "Weeks 1–3",
    title: "Foundation & Assessment Readiness",
    details:
      "Understanding the CBA/SLA framework, Canadian nursing standards, and identifying your knowledge gaps.",
  },
  {
    week: "Weeks 4–7",
    title: "Clinical Simulation & Practice",
    details:
      "In-hospital simulation sessions covering patient assessment, medication administration, wound care, and documentation.",
  },
  {
    week: "Weeks 8–10",
    title: "Scenario-Based Training",
    details:
      "Practice with real CBA/SLA scenarios, critical thinking exercises, and timed assessments with mentor feedback.",
  },
  {
    week: "Weeks 11–12",
    title: "Final Prep & Mock Assessment",
    details:
      "Full mock CBA/SLA under real conditions, 1-on-1 debrief with your mentor, and final readiness review.",
  },
];

const mentorshipPainPoints = [
  "Having difficulty navigating the healthcare system?",
  "Facing workplace issues and challenges?",
  "Needing support in harnessing confidence and professional skills?",
];

const mentorshipBenefits = [
  "Personalized guidance in nursing and healthcare",
  "Learn best and wise practices in Canadian practice",
  "Confidential, trusted advice for workplace challenges",
  "Improve assertiveness, communication & professionalism",
  "Develop specialized skills in your area of interest",
  "Widen your support network",
  "Become more confident and advance your career",
];

const careerPainPoints = [
  "Applied for multiple jobs but heard nothing?",
  "Still awaiting an interview invite?",
  "Wanting to ace the interview and land your dream job?",
];

const careerBenefits = [
  "Confidential career consulting and counselling",
  "Access to a dedicated mentor and/or coach",
  "Streamlined prospects and application process",
  "Resume building & cover letter development",
  "In-depth interview preparation",
  "Level-up your career trajectory",
];

const faqs = [
  {
    question: "How much does the CBA & SLA Boot Camp cost?",
    answer:
      "Contact us for current pricing. We offer payment plans and work with employers who may sponsor your training as part of a placement agreement.",
  },
  {
    question: "Do I need to be in Canada to participate?",
    answer:
      "The boot camp includes in-hospital simulation, so you'll need to be in Canada for those sessions. Mentorship and workshops can be done virtually from anywhere.",
  },
  {
    question: "What if I don't pass the CBA/SLA?",
    answer:
      "We support you until you're ready. If you need more time or practice, we work with you on a plan — you're not on your own.",
  },
  {
    question: "How do I sign up?",
    answer:
      "Book a free consultation and we'll assess where you are, recommend the right program, and get you started with the next available cohort.",
  },
  {
    question: "Can my employer sponsor my training?",
    answer:
      "Yes. Many of our employer partners sponsor boot camp and mentorship costs as part of the hiring agreement. Ask us about employer-sponsored options.",
  },
];

export default function CoursesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const bootcampRef = useRef<HTMLElement>(null);
  const curriculumRef = useRef<HTMLElement>(null);
  const programsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const heroEls = heroRef.current!.querySelectorAll(".courses-hero-anim");
      gsap.set(heroEls, { y: 25, autoAlpha: 0 });
      gsap.to(heroEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        delay: 0.15,
      });

      // Boot camp image
      gsap.set(".bc-image", {
        clipPath: "inset(4% 4% 4% 4% round 1.5rem)",
        autoAlpha: 0,
      });
      gsap.to(".bc-image", {
        clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
        autoAlpha: 1,
        duration: 0.6,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".bc-image", start: "top 80%" },
      });

      // Boot camp content
      const bcContent = bootcampRef.current!.querySelectorAll(".bc-content > *");
      gsap.set(bcContent, { x: 30, autoAlpha: 0 });
      gsap.to(bcContent, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: bootcampRef.current, start: "top 65%" },
      });

      // Curriculum
      const currEls = curriculumRef.current!.querySelectorAll(".curr-item");
      gsap.set(currEls, { y: 20, autoAlpha: 0 });
      currEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Other programs
      const progEls = programsRef.current!.querySelectorAll(".prog-card");
      gsap.set(progEls, { y: 40, autoAlpha: 0 });
      progEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // FAQ
      const faqEls = faqRef.current!.querySelectorAll(".faq-item");
      gsap.set(faqEls, { y: 15, autoAlpha: 0 });
      faqEls.forEach((item, i) => {
        gsap.to(item, {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          delay: i * 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 92%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── Section 1 — Hero ── */}
      <section ref={heroRef} className="relative min-h-[85svh] sm:min-h-[85vh] flex items-end overflow-hidden">
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

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 pb-12 sm:pb-16 md:pb-20 pt-32 sm:pt-36 md:pt-40">
          <div className="max-w-2xl">
            <p className="courses-hero-anim font-body text-xs sm:text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4 sm:mb-5">
              Learning & Mentorship
            </p>
            <h1
              className="courses-hero-anim font-heading font-bold text-white mb-5 sm:mb-6"
              style={{
                fontSize: "clamp(2rem, 8vw, 3.75rem)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
              }}
            >
              Built by IEN nurses,
              <br />
              for IEN nurses.
            </h1>
            <p className="courses-hero-anim font-body text-base md:text-lg text-white/60 leading-relaxed max-w-md mb-8">
              CBA &amp; SLA boot camps, 1-on-1 mentorship, and upskilling workshops —
              everything you need to succeed in Canadian healthcare.
            </p>
            <div className="courses-hero-anim flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <Link
                href="/consultation"
                className="group inline-flex items-center justify-center gap-2.5 text-foreground font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-white transition-all duration-300 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                Book a Consultation
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

      {/* ── Section 2 — CBA & SLA Boot Camp (deep dive) ── */}
      <section ref={bootcampRef} className="py-10 sm:py-section">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            {/* Mobile: tagline + title above image */}
            <div className="lg:hidden text-center">
              <span className="font-body text-xs font-semibold text-accent uppercase tracking-[0.08em]">
                Flagship Program
              </span>
              <h2 className="font-heading font-bold text-display-md text-foreground mt-2">
                CBA &amp; SLA Boot Camp
              </h2>
            </div>

            {/* Image */}
            <div className="lg:col-span-6">
              <div className="bc-image relative rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[4/5] shadow-xl shadow-foreground/5">
                <Image
                  src="/photo3.jpg"
                  alt="CBA & SLA Boot Camp training session"
                  fill
                  loading="lazy"
                  className="object-cover object-[center_15%] lg:object-[center_40%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 flex flex-col justify-center bc-content text-center lg:text-left items-center lg:items-start">
              {/* Desktop only title */}
              <span className="hidden lg:inline-block font-body text-[10px] font-semibold text-primary uppercase tracking-[0.15em] bg-secondary-light/50 lg:self-start px-3 py-1 rounded-full mb-5">
                Flagship Program
              </span>
              <h2 className="hidden lg:block font-heading font-bold text-display-md text-foreground mb-4">
                CBA &amp; SLA Boot Camp
              </h2>

              {/* Mobile: condensed */}
              <p className="font-body text-sm text-muted leading-relaxed mb-6 sm:hidden">
                Intensive 12-week program to prepare you for the CBA and SLA assessments. In-hospital simulation, hands-on practice, and mentorship from nurses who&apos;ve passed it themselves.
              </p>

              {/* Desktop: full content */}
              <div className="hidden sm:block">
                <p className="font-body text-base text-muted leading-relaxed mb-8">
                  Our intensive 12-week program prepares you for the
                  Competency-Based Assessment and Substantially Equivalent
                  Competency assessment. In-hospital simulation, hands-on practice,
                  and mentorship from nurses who&apos;ve passed it themselves.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "In-hospital simulation & hands-on clinical practice",
                    "Mentored by IEN nurses who passed the CBA/SLA",
                    "Study plans tailored to your specific gaps",
                    "Small cohorts for personalized attention",
                    "Mock assessments under real conditions",
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
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 mb-8 pb-8 border-b border-secondary/15 w-full">
                {[
                  { value: "12", label: "weeks" },
                  { value: "All", label: "levels" },
                  { value: "Live", label: "in-person" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6">
                    <div>
                      <p className="font-heading font-bold text-2xl text-primary leading-none">
                        {stat.value}
                      </p>
                      <p className="font-body text-xs text-muted mt-1">
                        {stat.label}
                      </p>
                    </div>
                    {i < 2 && <div className="w-px h-10 bg-secondary/20" />}
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-secondary-light/30 rounded-xl p-6 mb-8 w-full lg:w-auto">
                <p className="font-body text-sm text-foreground italic leading-relaxed mb-3 text-left">
                  &ldquo;I enrolled in the ien2RN SLA bootcamp with only one week
                  before my assessment. The mentorship gave me the confidence and
                  resilience I needed. Without a doubt, this is what started my
                  RN journey in BC.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
                    <Image
                      src="/april.jpg"
                      alt="April"
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-heading font-bold text-xs text-foreground">
                      April
                    </p>
                    <p className="font-body text-xs text-muted">
                      IEN from the Philippines, SLA Bootcamp Graduate
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 self-center lg:self-start"
              >
                Apply for the Next Cohort
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

      {/* ── Curriculum breakdown ── */}
      <section ref={curriculumRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="max-w-2xl mb-14 text-center sm:text-left mx-auto sm:mx-0">
            <p className="font-body text-xs sm:text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              What you&apos;ll learn
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              12 weeks, broken down
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculum.map((phase, i) => (
              <div
                key={phase.week}
                className="curr-item bg-offwhite rounded-2xl p-5 sm:p-6 border border-secondary/10"
              >
                <span className="hidden lg:block font-heading font-bold text-3xl text-primary/15 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block font-body text-xs font-semibold text-accent lg:text-primary uppercase tracking-[0.08em] lg:tracking-wide mb-2 lg:mt-3">
                  {phase.week}
                </span>
                <h3 className="font-heading font-bold text-base text-foreground mb-2 lg:mb-3">
                  {phase.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {phase.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3a — IEN Nurse Mentorship ── */}
      <section ref={programsRef} className="py-10 sm:py-section">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="prog-card grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Mobile: tagline + title above image */}
            <div className="lg:hidden order-1 text-center">
              <span className="font-body text-xs font-semibold text-accent uppercase tracking-[0.08em]">
                Mentorship
              </span>
              <h2 className="font-heading font-bold text-display-md text-foreground mt-2">
                IEN Nurse Mentorship
              </h2>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[4/5] shadow-lg shadow-foreground/5">
                <Image
                  src="/new2.png"
                  alt="IEN Nurse mentorship session"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 flex flex-col justify-center order-3 lg:order-2 text-center lg:text-left items-center lg:items-start">
              {/* Desktop only title */}
              <span className="hidden lg:block font-body text-[10px] font-semibold text-primary uppercase tracking-[0.15em] mb-4">
                Mentorship
              </span>
              <h2 className="hidden lg:block font-heading font-bold text-display-md text-foreground mb-5">
                IEN Nurse Mentorship
              </h2>
              {/* Mobile: condensed */}
              <p className="font-body text-sm text-muted leading-relaxed mb-6 sm:hidden">
                1-on-1 mentorship from nurses who&apos;ve been where you are. Get guidance on navigating the healthcare system, building confidence, and advancing your career.
              </p>

              {/* Desktop: full content */}
              <div className="hidden sm:block">
                <p className="font-body text-base text-muted leading-relaxed mb-6">
                  We utilise the power of mentorship to set you up for success from
                  the get-go. Whether you&apos;re an IEN nurse within or outside
                  Canada, our mentors are dedicated to supporting you in advancing
                  your competencies — as an entry-level nurse or exploring advanced
                  roles.
                </p>

                {/* Pain points */}
                <p className="font-heading font-bold text-sm text-foreground mb-3">
                  Are you an IEN nurse&hellip;
                </p>
                <div className="space-y-2 mb-8">
                  {mentorshipPainPoints.map((point) => (
                    <div key={point} className="flex items-start gap-2.5">
                      <span className="text-primary font-bold mt-0.5">?</span>
                      <span className="font-body text-sm text-muted">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <p className="font-heading font-bold text-sm text-foreground mb-3">
                  Benefits
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                  {mentorshipBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-primary shrink-0 mt-0.5"
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
                      <span className="font-body text-sm text-muted">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 mb-8 pb-8 border-b border-secondary/15 w-full">
                {[
                  { value: "1-on-1", label: "mentorship" },
                  { value: "Ongoing", label: "sessions" },
                  { value: "Virtual", label: "or in-person" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6">
                    <div>
                      <p className="font-heading font-bold text-xl text-primary leading-none">
                        {stat.value}
                      </p>
                      <p className="font-body text-xs text-muted mt-1">
                        {stat.label}
                      </p>
                    </div>
                    {i < 2 && <div className="w-px h-8 bg-secondary/20" />}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 self-center lg:self-start"
              >
                Register Now
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

      {/* ── Section 3b — Career Accelerator Program ── */}
      <section className="py-10 sm:py-section bg-secondary-light/25">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="prog-card grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Mobile: tagline + title above image */}
            <div className="lg:hidden order-1 text-center">
              <span className="font-body text-xs font-semibold text-accent uppercase tracking-[0.08em]">
                Career Development
              </span>
              <h2 className="font-heading font-bold text-display-md text-foreground mt-2">
                Career Accelerator Program
              </h2>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 order-2 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[4/5] shadow-lg shadow-foreground/5">
                <Image
                  src="/1.jpg"
                  alt="Career accelerator consultation"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  style={{ objectPosition: "center 30%" }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 flex flex-col justify-center order-3 lg:order-1 text-center lg:text-left items-center lg:items-start">
              {/* Desktop only title */}
              <span className="hidden lg:block font-body text-[10px] font-semibold text-primary uppercase tracking-[0.15em] mb-4">
                Career Development
              </span>
              <h2 className="hidden lg:block font-heading font-bold text-display-md text-foreground mb-5">
                Career Accelerator Program
              </h2>

              {/* Mobile: condensed */}
              <p className="font-body text-sm text-muted leading-relaxed mb-6 sm:hidden">
                Professional development and career advancement with 100+ years of combined healthcare leadership experience. From entry-level to specialized roles.
              </p>

              {/* Desktop: full content */}
              <div className="hidden sm:block">
                <p className="font-body text-base text-muted leading-relaxed mb-6">
                  Our dedicated team is positioned not just for entry-level and
                  specialized clinical practice but also for professional development
                  and career advancement. With our combined 100+ years of healthcare
                  and professional leadership, discover how our team truly makes a
                  difference in accelerating your career in Canada.
                </p>

                {/* Pain points */}
                <p className="font-heading font-bold text-sm text-foreground mb-3">
                  Are you an IEN nurse&hellip;
                </p>
                <div className="space-y-2 mb-8">
                  {careerPainPoints.map((point) => (
                    <div key={point} className="flex items-start gap-2.5">
                      <span className="text-primary font-bold mt-0.5">?</span>
                      <span className="font-body text-sm text-muted">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <p className="font-heading font-bold text-sm text-foreground mb-3">
                  Benefits
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                  {careerBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-primary shrink-0 mt-0.5"
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
                      <span className="font-body text-sm text-muted">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 mb-8 pb-8 border-b border-secondary/15 w-full">
                {[
                  { value: "100+", label: "years combined experience" },
                  { value: "1-on-1", label: "coaching" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6">
                    <div>
                      <p className="font-heading font-bold text-xl text-primary leading-none">
                        {stat.value}
                      </p>
                      <p className="font-body text-xs text-muted mt-1">
                        {stat.label}
                      </p>
                    </div>
                    {i < 1 && <div className="w-px h-8 bg-secondary/20" />}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 self-center lg:self-start"
              >
                Register Now
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

      {/* ── Section 4 — FAQ ── */}
      <section ref={faqRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left — heading */}
            <div className="lg:col-span-4">
              <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
                FAQ
              </p>
              <h2 className="font-heading font-bold text-display-md text-foreground mb-4">
                Common questions
              </h2>
              <p className="font-body text-sm text-muted leading-relaxed mb-6">
                Not sure which program is right for you? Book a free consultation
                and we&apos;ll help you figure it out.
              </p>
              <Link
                href="/contact"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
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
    </main>
  );
}
