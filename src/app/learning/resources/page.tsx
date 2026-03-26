"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

interface Resource {
  title: string;
  description: string;
  category: string;
  type: "free" | "paid";
  price?: string;
}

const resources: Resource[] = [
  {
    title: "NCLEX-RN Study Guide",
    description: "Comprehensive study guide covering all major NCLEX-RN content areas with practice questions and strategies.",
    category: "Exam Prep",
    type: "paid",
    price: "$29",
  },
  {
    title: "Canadian Healthcare System Overview",
    description: "A concise guide to understanding the Canadian healthcare system, provincial differences, and career navigation.",
    category: "Orientation",
    type: "free",
  },
  {
    title: "Medication Math Reference Sheet",
    description: "Quick-reference sheet for common medication calculations used in Canadian healthcare settings.",
    category: "Clinical Reference",
    type: "free",
  },
  {
    title: "Resume Template for IENs",
    description: "Canadian-format resume template specifically designed for internationally educated nurses.",
    category: "Career",
    type: "free",
  },
  {
    title: "Clinical Skills Competency Checklist",
    description: "Self-assessment checklist covering essential clinical competencies in Canadian nursing practice.",
    category: "Clinical Reference",
    type: "paid",
    price: "$14",
  },
  {
    title: "Interview Preparation Guide",
    description: "Common nursing interview questions in Canada, how to answer them, and what employers look for.",
    category: "Career",
    type: "free",
  },
  {
    title: "Pharmacology Quick Reference",
    description: "Essential drug classifications, common medications, and nursing considerations for Canadian practice.",
    category: "Clinical Reference",
    type: "paid",
    price: "$19",
  },
  {
    title: "Provincial Licensing Requirements",
    description: "Detailed breakdown of nursing licensing requirements for each Canadian province and territory.",
    category: "Orientation",
    type: "free",
  },
];

const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];

export default function ResourcesPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filtered = filter === "All" ? resources : resources.filter((r) => r.category === filter);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".resource-card");
    gsap.set(cards, { y: 25, autoAlpha: 0 });
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        delay: i * 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: card, start: "top 90%" },
      });
    });
  }, [filter]);

  const handleDownload = (resource: Resource) => {
    setSelectedResource(resource);
    setShowModal(true);
  };

  return (
    <main>
      <PageHero
        label="Resources"
        heading={
          <>
            Downloadable materials for{" "}
            <span className="serif-italic text-primary">healthcare professionals</span>
          </>
        }
        description="Study guides, reference sheets, and career resources. Download free materials or purchase premium content to support your professional development."
      />

      <section className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-body text-sm px-5 py-2 rounded-full transition-all duration-300 ${
                  filter === cat
                    ? "bg-primary text-white"
                    : "bg-secondary-light/40 text-muted hover:bg-secondary-light hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Resources grid — distinct free vs paid styling */}
          <div ref={gridRef} className="grid md:grid-cols-2 gap-5">
            {filtered.map((resource) => (
              <button
                key={resource.title}
                onClick={() => handleDownload(resource)}
                className={`resource-card text-left rounded-2xl p-6 md:p-7 transition-all duration-300 group flex gap-5 ${
                  resource.type === "paid"
                    ? "bg-foreground hover:bg-foreground/95 text-white"
                    : "bg-secondary-light/30 hover:bg-secondary-light/50"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    resource.type === "paid" ? "bg-white/10" : "bg-white"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${resource.type === "paid" ? "text-white/70" : "text-primary"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span
                        className={`font-body text-[10px] font-semibold uppercase tracking-wider ${
                          resource.type === "paid" ? "text-white/30" : "text-primary"
                        }`}
                      >
                        {resource.category}
                      </span>
                      <h3
                        className={`font-heading font-bold text-base mt-0.5 ${
                          resource.type === "paid"
                            ? "text-white group-hover:text-white/90"
                            : "text-foreground group-hover:text-primary"
                        } transition-colors duration-300`}
                      >
                        {resource.title}
                      </h3>
                    </div>
                    <span
                      className={`font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                        resource.type === "free"
                          ? "bg-green-50 text-green-600"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {resource.type === "free" ? "Free" : resource.price}
                    </span>
                  </div>
                  <p
                    className={`font-body text-sm leading-relaxed ${
                      resource.type === "paid" ? "text-white/40" : "text-muted"
                    }`}
                  >
                    {resource.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Info note */}
          <div className="mt-14 flex items-start gap-4 p-5 rounded-xl bg-secondary-light/30">
            <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p className="font-body text-sm text-muted leading-relaxed">
              Free resources require your name and email. Paid resources are
              processed through Stripe — you&apos;ll receive the PDF
              immediately after payment. No account required.
            </p>
          </div>
        </div>
      </section>

      {/* Download/Purchase Modal */}
      {showModal && selectedResource && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary-light/50 flex items-center justify-center text-muted hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="font-heading font-bold text-xl text-foreground mb-1">
              {selectedResource.type === "free" ? "Download" : "Purchase"}{" "}
            </h3>
            <p className="font-body text-sm text-muted mb-6">
              {selectedResource.title}
              {selectedResource.type === "paid" && ` — ${selectedResource.price}`}
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

      <CTABanner />
    </main>
  );
}
