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
      label: "Create My Profile",
      href: "https://engine-hire.com",
      external: true,
    },
    secondary: {
      label: "Browse our courses",
      href: "/learning/courses",
    },
  },
  almost: {
    headline: "You're almost there",
    description:
      "You're on the right track, but there are a few things to complete before we can match you with employers. Create your profile now and our team will help you with the remaining steps, including mentorship, training, and credential support.",
    cta: {
      label: "Create My Profile",
      href: "https://engine-hire.com",
      external: true,
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

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const total = questions.length;
  const progress = done ? 100 : (step / total) * 100;
  const current = questions[step];

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
    if (!done) animateIn();
  }, [step, done]);

  useEffect(() => {
    if (done && resultRef.current) {
      const els = resultRef.current.querySelectorAll(".result-animate");
      gsap.set(els, { y: 25, autoAlpha: 0 });
      gsap.to(els, {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, [done]);

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
      setDone(true);
    }
  };

  const tier = done ? getResult(answers) : null;
  const result = tier ? results[tier] : null;

  return (
    <main className="min-h-screen flex flex-col">
      {/* Spacer for nav */}
      <div className="h-28 shrink-0" />

      <div className="flex-1 flex flex-col items-center px-6 md:px-12 pb-20">
        <div className="w-full max-w-[600px]">
          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <p className="font-body text-xs text-muted">
                {done
                  ? "Assessment complete"
                  : `Question ${step + 1} of ${total}`}
              </p>
              {!done && (
                <p className="font-body text-xs text-muted">
                  {Math.round(progress)}%
                </p>
              )}
            </div>
            <div className="h-1.5 bg-secondary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ─── Questions ─── */}
          {!done && current && (
            <div ref={containerRef}>
              <p className="q-animate font-body text-[10px] font-semibold text-primary uppercase tracking-[0.15em] mb-3">
                Candidate Assessment
              </p>
              <h1 className="q-animate font-heading font-black text-2xl md:text-3xl text-foreground mb-2 leading-tight">
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
                    className="q-animate w-full text-left p-5 rounded-xl border border-secondary/20 hover:border-primary/40 hover:bg-secondary-light/30 transition-all duration-200 group"
                  >
                    <span className="font-body text-base text-foreground group-hover:text-primary transition-colors duration-200">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Back button */}
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="q-animate mt-8 inline-flex items-center gap-2 font-body text-sm text-muted hover:text-foreground transition-colors duration-200"
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

              <h1 className="result-animate font-heading font-black text-2xl md:text-3xl text-foreground mb-4 leading-tight">
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

              {/* Retake */}
              <button
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                  setDone(false);
                }}
                className="result-animate mt-10 inline-flex items-center gap-2 font-body text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
                Retake assessment
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
