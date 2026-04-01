"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

export default function RequestStaffPage() {
  const formRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = formRef.current!.querySelectorAll(".form-animate");
      gsap.set(els, { y: 20, autoAlpha: 0 });
      gsap.to(els, {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: formRef.current, start: "top 75%" },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        label="Request Staff"
        heading={
          <>
            Tell us what you need and we&apos;ll find the{" "}
            <span className="serif-italic text-primary">right fit</span>
          </>
        }
        description="Fill out the form below with your staffing requirements. Our team will review your request and get back to you within one business day."
        headingClassName="page-hero-heading font-heading font-bold text-foreground mb-6"
        headingStyle={{
          fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
          lineHeight: "1.08",
          letterSpacing: "-0.03em",
        }}
      />

      {/* Centered form - focused, clean */}
      <section ref={formRef} className="py-section">
        <div className="max-w-[720px] mx-auto px-6 md:px-12">
          {submitted ? (
            <div className="form-animate bg-secondary-light/40 rounded-3xl p-10 md:p-14 text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                Request submitted!
              </h3>
              <p className="font-body text-sm text-muted max-w-md mx-auto mb-6">
                Thank you for your interest. Our team will review your request
                and reach out within one business day.
              </p>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Or schedule a call now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Organization */}
              <div>
                <h2 className="form-animate font-heading font-bold text-lg text-foreground mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-white font-body text-xs font-bold flex items-center justify-center">1</span>
                  Organization details
                </h2>
                <div className="space-y-4 pl-10">
                  <div className="form-animate grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                        Organization name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                        placeholder="e.g. Toronto General Hospital"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                        Facility type *
                      </label>
                      <select
                        required
                        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors text-muted"
                      >
                        <option value="">Select type</option>
                        <option value="hospital">Hospital</option>
                        <option value="clinic">Clinic</option>
                        <option value="ltc">Long-term Care</option>
                        <option value="home-care">Home Care</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-animate h-px bg-secondary/15" />

              {/* Section 2: Contact */}
              <div>
                <h2 className="form-animate font-heading font-bold text-lg text-foreground mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-white font-body text-xs font-bold flex items-center justify-center">2</span>
                  Contact information
                </h2>
                <div className="space-y-4 pl-10">
                  <div className="form-animate grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                        Contact name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                        Job title
                      </label>
                      <input
                        type="text"
                        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                        placeholder="Director of Nursing"
                      />
                    </div>
                  </div>
                  <div className="form-animate grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                        placeholder="jane@hospital.ca"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors"
                        placeholder="+1 (416) 555-0123"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-animate h-px bg-secondary/15" />

              {/* Section 3: Staffing Needs */}
              <div>
                <h2 className="form-animate font-heading font-bold text-lg text-foreground mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary text-white font-body text-xs font-bold flex items-center justify-center">3</span>
                  Staffing needs
                </h2>
                <div className="space-y-4 pl-10">
                  <div className="form-animate">
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                      Describe your staffing needs *
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Number of nurses, specialties required, shift requirements, etc."
                    />
                  </div>
                  <div className="form-animate grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                        Placement type *
                      </label>
                      <select
                        required
                        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors text-muted"
                      >
                        <option value="">Select type</option>
                        <option value="permanent">Permanent</option>
                        <option value="temporary">Temporary / Contract</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">
                        Timeline *
                      </label>
                      <select
                        required
                        className="w-full font-body text-sm px-4 py-3 rounded-xl border border-secondary/25 bg-transparent focus:outline-none focus:border-primary transition-colors text-muted"
                      >
                        <option value="">How soon?</option>
                        <option value="immediate">Immediately</option>
                        <option value="2-weeks">Within 2 weeks</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="3-months">Within 3 months</option>
                        <option value="planning">Just planning ahead</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-animate pl-10">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2.5 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
                >
                  Submit Request
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* What happens next - horizontal at bottom */}
          <div className="mt-16 pt-12 border-t border-secondary/15">
            <p className="font-heading font-bold text-sm text-foreground mb-6 text-center">
              What happens after you submit
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { num: "1", text: "We review your request within one business day" },
                { num: "2", text: "A team member reaches out to discuss details" },
                { num: "3", text: "We start matching qualified candidates" },
              ].map((step) => (
                <div key={step.num}>
                  <div className="w-8 h-8 rounded-full bg-secondary-light text-primary font-heading font-bold text-xs flex items-center justify-center mx-auto mb-2">
                    {step.num}
                  </div>
                  <p className="font-body text-xs text-muted leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
