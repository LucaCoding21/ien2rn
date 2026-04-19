"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

/* ──────────────────────────────────────────────
   Assessment questions - based on ien2RN's intake
   process. Filters: licensing, assessments, relocation
   willingness, experience, availability.
   ────────────────────────────────────────────── */

interface Question {
  id: string;
  question: string;
  subtitle?: string;
  options: { label: string; value: string; weight: number }[];
}

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  province: "bc" | "alberta" | "other_canada" | "not_licensed";
}

const provinceOptions: { label: string; value: Contact["province"] }[] = [
  { label: "British Columbia", value: "bc" },
  { label: "Alberta", value: "alberta" },
  { label: "Somewhere else in Canada", value: "other_canada" },
  { label: "I'm not licensed yet", value: "not_licensed" },
];

const questions: Question[] = [
  {
    id: "licensed",
    question: "Are you a registered nurse in your home country?",
    subtitle: "This helps us understand your starting point.",
    options: [
      { label: "Yes, I am a registered nurse", value: "yes", weight: 2 },
      { label: "I was, but my license has expired", value: "expired", weight: 1 },
      { label: "No, I am still in training", value: "no", weight: 0 },
    ],
  },
  {
    id: "canada_license",
    question: "What is your Canadian nursing license status?",
    subtitle: "Provincial licensing is required to work in Canada.",
    options: [
      { label: "I have a Canadian nursing license", value: "licensed", weight: 3 },
      { label: "I am currently in the licensing process", value: "in_process", weight: 2 },
      { label: "I have not started the process yet", value: "not_started", weight: 0 },
    ],
  },
  {
    id: "assessment",
    question: "Have you completed your CBA or SLA assessment?",
    options: [
      { label: "Yes, I have completed it", value: "passed", weight: 3 },
      { label: "I am currently preparing for it", value: "studying", weight: 1 },
      { label: "I have not started yet", value: "not_taken", weight: 0 },
    ],
  },
  {
    id: "experience",
    question: "How many years of nursing experience do you have?",
    options: [
      { label: "5+ years", value: "5plus", weight: 3 },
      { label: "2–5 years", value: "2to5", weight: 2 },
      { label: "Less than 2 years", value: "less2", weight: 1 },
      { label: "I am a new graduate", value: "new_grad", weight: 0 },
    ],
  },
  {
    id: "relocate",
    question: "Are you willing to relocate within Canada?",
    subtitle:
      "Our current opportunities span BC Interior, Vancouver Island, and other regions.",
    options: [
      { label: "Yes, I am open to relocating anywhere", value: "anywhere", weight: 3 },
      { label: "Yes, but only to specific provinces", value: "specific", weight: 2 },
      { label: "No, I can only work in my current location", value: "no", weight: 0 },
    ],
  },
  {
    id: "availability",
    question: "How soon are you available to start working?",
    options: [
      { label: "Immediately", value: "immediate", weight: 3 },
      { label: "Within 1–3 months", value: "1to3", weight: 2 },
      { label: "Within 3–6 months", value: "3to6", weight: 1 },
      { label: "6+ months from now", value: "6plus", weight: 0 },
    ],
  },
];

type ResultTier = "ready" | "almost" | "not_ready";

function getResult(answers: Record<string, number>): ResultTier {
  const total = Object.values(answers).reduce((sum, w) => sum + w, 0);
  const max = questions.length * 3;
  const pct = total / max;

  if (pct >= 0.6) return "ready";
  if (pct >= 0.3) return "almost";
  return "not_ready";
}

const results: Record<
  ResultTier,
  {
    headline: string;
    description: string;
    cta: { label: string; href: string; external?: boolean };
    secondary?: { label: string; href: string };
  }
> = {
  ready: {
    headline: "You're ready to get started",
    description:
      "Based on your answers, you meet the requirements to be matched with healthcare employers in Canada. Create your profile and our team will begin the matching process.",
    cta: {
      label: "Start My Application",
      href: "/candidates/apply",
    },
    secondary: {
      label: "Browse our courses",
      href: "/learning/courses",
    },
  },
  almost: {
    headline: "You're almost there",
    description:
      "You're on the right track, but there are a few things to complete before we can match you with employers. Start your application now and our team will help you with the remaining steps, including mentorship, training, and credential support.",
    cta: {
      label: "Start My Application",
      href: "/candidates/apply",
    },
    secondary: {
      label: "Explore training & courses",
      href: "/learning/courses",
    },
  },
  not_ready: {
    headline: "Let's get you prepared",
    description:
      "It looks like you have some steps to complete before you're ready for placement. That's okay. We have courses and resources designed to help internationally educated nurses get licensed and job-ready in Canada.",
    cta: {
      label: "View Courses & Training",
      href: "/learning/courses",
    },
    secondary: {
      label: "Download free resources",
      href: "/learning/resources",
    },
  },
};

/* ─── Component ─── */

type GateStage = "contact" | "province" | "done";

export default function AssessmentPage() {
  const [gateStage, setGateStage] = useState<GateStage>("contact");
  const [contact, setContact] = useState<Contact | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    province: "" as Contact["province"] | "",
  });
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const total = questions.length;
  const totalSteps = 2 + total; // contact + province + 6 questions
  const currentStepIndex =
    gateStage === "contact"
      ? 0
      : gateStage === "province"
      ? 1
      : 2 + step;
  const progress = done ? 100 : (currentStepIndex / totalSteps) * 100;
  const current = questions[step];

  const contactValid =
    form.firstName.trim().length > 0 &&
    form.lastName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  /* animate question transitions */
  const animateIn = () => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll(".q-animate");
    gsap.set(els, { y: 20, autoAlpha: 0 });
    gsap.to(els, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      stagger: 0.06,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    if (gateStage === "done" && !done) animateIn();
  }, [step, done, gateStage]);

  useEffect(() => {
    if (gateStage !== "done" && formRef.current) {
      const els = formRef.current.querySelectorAll(".form-animate");
      gsap.set(els, { y: 20, autoAlpha: 0 });
      gsap.to(els, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      });
    }
  }, [gateStage]);

  useEffect(() => {
    if (done && resultRef.current) {
      const els = resultRef.current.querySelectorAll(".result-animate");
      gsap.set(els, { y: 25, autoAlpha: 0 });
      gsap.to(els, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, [done]);

  const submitResults = (finalAnswers: Record<string, number>) => {
    if (!contact) return;
    const payload = {
      contact,
      answers: finalAnswers,
      tier: getResult(finalAnswers),
      submittedAt: new Date().toISOString(),
    };
    /* TODO: POST to /api/assessment-submit once Resend is wired up */
    console.log("[assessment submit]", payload);
  };

  const handleSelect = (weight: number) => {
    const next = { ...answers, [current.id]: weight };
    setAnswers(next);

    if (step < total - 1) {
      /* brief exit then advance */
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            setStep(step + 1);
            gsap.set(containerRef.current, { autoAlpha: 1, y: 0 });
          },
        });
      } else {
        setStep(step + 1);
      }
    } else {
      submitResults(next);
      setDone(true);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValid) return;
    setGateStage("province");
  };

  const handleProvinceSelect = (province: Contact["province"]) => {
    setForm({ ...form, province });
    setContact({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      province,
    });
    setGateStage("done");
  };

  const tier = done ? getResult(answers) : null;
  const result = tier ? results[tier] : null;

  return (
    <main className="min-h-[100svh] flex flex-col">
      {/* Spacer for nav */}
      <div className="h-24 sm:h-28 shrink-0" />

      <div className="flex-1 flex flex-col items-center px-5 sm:px-6 md:px-12 pb-16 sm:pb-20">
        <div className="w-full max-w-[600px]">
          {/* Progress bar — spans the whole flow */}
          {!done && (
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center justify-between mb-3">
                <p className="font-body text-xs text-muted">
                  Step {currentStepIndex + 1} of {totalSteps}
                </p>
                <p className="font-body text-xs text-muted">
                  {Math.round(progress)}%
                </p>
              </div>
              <div className="h-1.5 bg-secondary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

        {/* ─── Gate step 1: contact info ─── */}
        {gateStage === "contact" && (
          <div ref={formRef}>
            <h1 className="form-animate font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-tight">
              See if you&apos;re ready to work in Canada
            </h1>
            <p className="form-animate font-body text-base text-muted leading-relaxed mb-8">
              Start by sharing your name and email so our team can follow up with you.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="form-animate grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block font-body text-sm font-medium text-foreground mb-2">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-secondary/25 bg-white font-body text-base text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-body text-sm font-medium text-foreground mb-2">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-secondary/25 bg-white font-body text-base text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="form-animate">
                <label htmlFor="email" className="block font-body text-sm font-medium text-foreground mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-secondary/25 bg-white font-body text-base text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200"
                />
              </div>

              <div className="form-animate pt-2">
                <button
                  type="submit"
                  disabled={!contactValid}
                  className="inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── Gate step 2: licensing ─── */}
        {gateStage === "province" && (
          <div ref={formRef}>
            <button
              type="button"
              onClick={() => setGateStage("contact")}
              className="form-animate mb-6 inline-flex items-center gap-2 font-body text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Previous question
            </button>

            <h1 className="form-animate font-heading font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-8 leading-tight">
              Where are you licensed to work as a nurse?
            </h1>

            <div className="space-y-3">
              {provinceOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleProvinceSelect(opt.value)}
                  className="form-animate w-full text-left p-4 rounded-xl border border-secondary/20 hover:border-primary/40 hover:bg-secondary-light/30 transition-all duration-200 group"
                >
                  <span className="font-body text-base text-foreground group-hover:text-primary transition-colors duration-200">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {gateStage === "done" && (
        <div>
          {/* ─── Questions ─── */}
          {!done && current && (
            <div ref={containerRef}>
              {/* Back button — top */}
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="q-animate mb-6 inline-flex items-center gap-2 font-body text-sm text-muted hover:text-foreground transition-colors duration-200"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  Previous question
                </button>
              )}

              <h1 className="q-animate font-heading font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-2 leading-tight">
                {current.question}
              </h1>
              {current.subtitle && (
                <p className="q-animate font-body text-sm text-muted mb-8">
                  {current.subtitle}
                </p>
              )}
              {!current.subtitle && <div className="mb-8" />}

              <div className="space-y-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.weight)}
                    className="q-animate w-full text-left p-4 rounded-xl border border-secondary/20 hover:border-primary/40 hover:bg-secondary-light/30 transition-all duration-200 group"
                  >
                    <span className="font-body text-base text-foreground group-hover:text-primary transition-colors duration-200">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Results ─── */}
          {done && result && (
            <div ref={resultRef}>
              {/* Icon */}
              <div
                className={`result-animate w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                  tier === "ready"
                    ? "bg-green-50"
                    : tier === "almost"
                    ? "bg-amber-50"
                    : "bg-secondary-light"
                }`}
              >
                {tier === "ready" ? (
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : tier === "almost" ? (
                  <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                )}
              </div>

              <h1 className="result-animate font-heading font-bold text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                {result.headline}
              </h1>
              <p className="result-animate font-body text-base text-muted leading-relaxed mb-10 max-w-lg">
                {result.description}
              </p>

              <div className="result-animate flex flex-col sm:flex-row items-start gap-4">
                {result.cta.external ? (
                  <a
                    href={result.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                  >
                    {result.cta.label}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    href={result.cta.href}
                    className="inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                  >
                    {result.cta.label}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                )}

                {result.secondary && (
                  <Link
                    href={result.secondary.href}
                    className="inline-flex items-center gap-2 font-body font-medium text-sm text-muted hover:text-primary transition-colors duration-300 py-3.5"
                  >
                    {result.secondary.label}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                )}
              </div>

            </div>
          )}
        </div>
        )}
        </div>
      </div>
    </main>
  );
}
