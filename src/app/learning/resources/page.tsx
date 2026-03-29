"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Resource {
  title: string;
  description: string;
  type: "free" | "paid";
  price?: string;
}

interface ResourceGroup {
  stage: string;
  subtitle: string;
  resources: Resource[];
}

const freeResources: ResourceGroup[] = [
  {
    stage: "Getting Started",
    subtitle: "New to Canadian healthcare? Start here.",
    resources: [
      {
        title: "Canadian Healthcare System Overview",
        description:
          "A concise guide to understanding the Canadian healthcare system, provincial differences, and career navigation.",
        type: "free",
      },
      {
        title: "Provincial Licensing Requirements",
        description:
          "Detailed breakdown of nursing licensing requirements for each Canadian province and territory.",
        type: "free",
      },
    ],
  },
  {
    stage: "Preparing for Assessment",
    subtitle: "Getting ready for CBA, SLA, or clinical practice.",
    resources: [
      {
        title: "Medication Math Reference Sheet",
        description:
          "Quick-reference sheet for common medication calculations used in Canadian healthcare settings.",
        type: "free",
      },
    ],
  },
  {
    stage: "Landing Your Job",
    subtitle: "Resume, interviews, and getting hired.",
    resources: [
      {
        title: "Resume Template for IENs",
        description:
          "Canadian-format resume template specifically designed for internationally educated nurses.",
        type: "free",
      },
      {
        title: "Interview Preparation Guide",
        description:
          "Common nursing interview questions in Canada, how to answer them, and what employers look for.",
        type: "free",
      },
    ],
  },
];

const premiumResources: Resource[] = [
  {
    title: "CBA & SLA Study Guide",
    description:
      "Comprehensive study guide covering all major CBA and SLA assessment areas with practice scenarios, strategies, and self-assessment tools.",
    type: "paid",
    price: "$29",
  },
  {
    title: "Clinical Skills Competency Checklist",
    description:
      "Self-assessment checklist covering essential clinical competencies in Canadian nursing practice. Track your readiness.",
    type: "paid",
    price: "$14",
  },
  {
    title: "Pharmacology Quick Reference",
    description:
      "Essential drug classifications, common medications, and nursing considerations for Canadian practice. Built for quick lookup.",
    type: "paid",
    price: "$19",
  },
];

export default function ResourcesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const premiumRef = useRef<HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const headerEls = pageRef.current!.querySelectorAll(".res-header");
      gsap.set(headerEls, { y: 20, autoAlpha: 0 });
      gsap.to(headerEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.3,
      });

      // Free resource groups
      const groups = pageRef.current!.querySelectorAll(".res-group");
      groups.forEach((group) => {
        const els = group.querySelectorAll(".res-card");
        gsap.set(els, { y: 20, autoAlpha: 0 });
        gsap.to(els, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });

      // Premium
      if (premiumRef.current) {
        const premEls =
          premiumRef.current.querySelectorAll(".premium-card");
        gsap.set(premEls, { y: 30, autoAlpha: 0 });
        premEls.forEach((el, i) => {
          gsap.to(el, {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleDownload = (resource: Resource) => {
    setSelectedResource(resource);
    setShowModal(true);
  };

  return (
    <main>
      <div ref={pageRef}>
        {/* ── Header (compact, no hero) ── */}
        <section className="pt-32 pb-8 md:pt-40 md:pb-10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <p className="res-header font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-3">
              Resources
            </p>
            <h1 className="res-header font-heading font-bold text-display-md text-foreground mb-3">
              Free downloads for your journey
            </h1>
            <p className="res-header font-body text-base text-muted leading-relaxed max-w-xl">
              Study guides, templates, and reference materials — organized by
              where you are in your nursing career.
            </p>
            <div className="res-header h-px bg-gradient-to-r from-primary/25 via-secondary/20 to-transparent mt-10" />
          </div>
        </section>

        {/* ── Free Resources (grouped by journey stage) ── */}
        <section className="pb-section">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="space-y-14">
              {freeResources.map((group) => (
                <div key={group.stage} className="res-group">
                  <div className="flex items-baseline gap-3 mb-5">
                    <h2 className="font-heading font-bold text-xl text-foreground">
                      {group.stage}
                    </h2>
                    <p className="font-body text-sm text-muted hidden sm:block">
                      — {group.subtitle}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.resources.map((resource) => (
                      <button
                        key={resource.title}
                        onClick={() => handleDownload(resource)}
                        className="res-card text-left group bg-offwhite border border-secondary/15 rounded-xl p-5 hover:border-primary/25 hover:shadow-sm transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
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
                            <h3 className="font-heading font-bold text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                              {resource.title}
                            </h3>
                            <p className="font-body text-xs text-muted leading-relaxed">
                              {resource.description}
                            </p>
                            <span className="inline-block mt-3 font-body text-[10px] font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
                              Free
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── Premium Resources ── */}
      <section ref={premiumRef} className="py-section bg-foreground">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-12">
            <p className="font-body text-sm font-semibold text-white/30 uppercase tracking-[0.2em] mb-4">
              Go deeper
            </p>
            <h2 className="font-heading font-bold text-display-sm text-white mb-3">
              Premium resources
            </h2>
            <p className="font-body text-base text-white/40 leading-relaxed">
              In-depth study materials designed to complement our programs. Built
              by IEN nurses who&apos;ve passed these assessments themselves.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {premiumResources.map((resource) => (
              <button
                key={resource.title}
                onClick={() => handleDownload(resource)}
                className="premium-card text-left group bg-white/[0.06] border border-white/10 rounded-xl p-6 hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/60 shrink-0 group-hover:bg-white group-hover:text-foreground transition-colors duration-300">
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
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <span className="font-heading font-bold text-lg text-white">
                    {resource.price}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-2 group-hover:text-secondary transition-colors duration-300">
                  {resource.title}
                </h3>
                <p className="font-body text-sm text-white/35 leading-relaxed mb-5">
                  {resource.description}
                </p>
                <span className="inline-flex items-center gap-2 font-body font-semibold text-sm text-white/50 group-hover:text-white transition-colors duration-300">
                  Purchase & Download
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            ))}
          </div>

          {/* Info */}
          <p className="font-body text-xs text-white/20 mt-8">
            Paid resources are processed securely through Stripe. You&apos;ll receive
            the PDF immediately after payment. No account required.
          </p>
        </div>
      </section>

      {/* ── Bottom nudge back to programs ── */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-secondary-light/30 px-8 md:px-10 py-8">
            <div>
              <p className="font-heading font-bold text-lg text-foreground mb-1">
                Want more than resources?
              </p>
              <p className="font-body text-sm text-muted">
                Our CBA boot camp, mentorship, and career programs go deeper
                than any PDF.
              </p>
            </div>
            <Link
              href="/learning/courses"
              className="group shrink-0 inline-flex items-center justify-center gap-2.5 font-body font-semibold text-sm px-7 py-3.5 rounded-full bg-primary text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              View Programs
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
      </section>

      {/* ── Download/Purchase Modal ── */}
      {showModal && selectedResource && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-offwhite rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary-light/50 flex items-center justify-center text-muted hover:text-foreground transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="font-heading font-bold text-xl text-foreground mb-1">
              {selectedResource.type === "free" ? "Download" : "Purchase"}
            </h3>
            <p className="font-body text-sm text-muted mb-6">
              {selectedResource.title}
              {selectedResource.type === "paid" &&
                ` (${selectedResource.price})`}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <button
                type="submit"
                className={`inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 w-full ${
                  selectedResource.type === "free"
                    ? "bg-primary text-white hover:shadow-lg hover:shadow-primary/20"
                    : "bg-foreground text-white hover:shadow-lg hover:shadow-foreground/20"
                }`}
              >
                {selectedResource.type === "free"
                  ? "Download Now"
                  : `Pay ${selectedResource.price} & Download`}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
