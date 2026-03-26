"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    number: "01",
    title: "Pre-screened candidates",
    description: "Every nurse in our network has been vetted for credentials, language proficiency, and clinical readiness.",
  },
  {
    number: "02",
    title: "Fast turnaround",
    description: "We maintain a ready-to-work talent pool so we can fill positions faster than traditional recruitment.",
  },
  {
    number: "03",
    title: "Flexible staffing",
    description: "From permanent hires to short-term placements, we tailor our approach to your facility's needs.",
  },
  {
    number: "04",
    title: "Ongoing support",
    description: "We don't just place nurses — we support them through onboarding and beyond, reducing turnover.",
  },
];

export default function EmployersPage() {
  const benefitsRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const nextRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Benefits — staggered fade
      const benefitEls = benefitsRef.current!.querySelectorAll(".benefit-item");
      gsap.set(benefitEls, { y: 25, autoAlpha: 0 });
      benefitEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Stats — count-up feel with scale
      const statEls = statsRef.current!.querySelectorAll(".stat-item");
      gsap.set(statEls, { scale: 0.9, autoAlpha: 0 });
      gsap.to(statEls, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 75%" },
      });

      // Next steps cards
      const nextCards = nextRef.current!.querySelectorAll(".next-card");
      gsap.set(nextCards, { y: 40, autoAlpha: 0 });
      nextCards.forEach((card, i) => {
        gsap.to(card, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <PageHero
        label="For Employers"
        heading={
          <>
            Qualified healthcare professionals,{" "}
            <span className="serif-italic text-primary">ready when you need them</span>
          </>
        }
        description="ien2RN connects healthcare facilities with pre-screened, qualified internationally educated nurses. We handle the recruitment so you can focus on patient care."
      />

      {/* Benefits — Split layout: large heading left, list right */}
      <section ref={benefitsRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                Why ien2RN
              </p>
              <h2 className="font-heading font-black text-display-md text-foreground">
                Recruitment that{" "}
                <span className="serif-italic text-primary">works</span>
              </h2>
            </div>

            <div className="lg:col-span-8">
              {benefits.map((benefit, i) => (
                <div
                  key={benefit.number}
                  className={`benefit-item flex gap-6 py-8 ${
                    i < benefits.length - 1 ? "border-b border-secondary/15" : ""
                  }`}
                >
                  <span className="font-heading font-black text-4xl text-primary/15 leading-none shrink-0 w-16">
                    {benefit.number}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-sm text-muted leading-relaxed max-w-md">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section ref={statsRef} className="py-16 bg-primary">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: "500+", label: "Nurses in our network" },
              { stat: "95%", label: "Client satisfaction" },
              { stat: "2 wk", label: "Average time to fill" },
              { stat: "50+", label: "Facility partnerships" },
            ].map((item) => (
              <div key={item.label} className="stat-item text-center">
                <p className="font-heading font-black text-3xl md:text-4xl text-white mb-1">
                  {item.stat}
                </p>
                <p className="font-body text-xs text-white/40">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps — Two cards */}
      <section ref={nextRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-14">
            <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
              Get started
            </p>
            <h2 className="font-heading font-black text-display-md text-foreground">
              What would you like to{" "}
              <span className="serif-italic text-primary">do next?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Services Card — image */}
            <Link
              href="/employers/services"
              className="next-card group block"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5">
                <Image
                  src="/hero-nurse.jpg"
                  alt="Our staffing services"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <span className="font-body text-[10px] font-semibold text-primary uppercase tracking-[0.15em]">
                Learn more
              </span>
              <h3 className="font-heading font-black text-xl md:text-2xl text-foreground mt-1.5 mb-2 group-hover:text-primary transition-colors duration-300">
                Our Services
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-3">
                Explore our staffing solutions — temporary, permanent, and specialty placements.
              </p>
              <span className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary">
                View services
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            {/* Request Staff Card — solid bg */}
            <Link
              href="/employers/request-staff"
              className="next-card group block bg-foreground rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-white/[0.02] -translate-y-1/3 translate-x-1/4" />
              <div className="relative z-10">
                <span className="font-body text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em]">
                  Ready to hire?
                </span>
                <h3 className="font-heading font-black text-xl md:text-2xl text-white mt-1.5 mb-3">
                  Request Staff
                </h3>
                <p className="font-body text-sm text-white/40 leading-relaxed max-w-sm">
                  Tell us about your staffing needs and we&apos;ll find the right
                  nurses for your facility.
                </p>
              </div>
              <span className="relative z-10 inline-flex items-center gap-2 font-body font-semibold text-sm text-white mt-6 group-hover:gap-3 transition-all duration-300">
                Submit a request
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
