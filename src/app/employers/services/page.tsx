"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Temporary Placements",
    description: "Short-term and contract nurses to cover surges, leaves, or seasonal demand. Our temporary staff are fully vetted and ready to integrate into your team from day one.",
    features: ["Rapid deployment", "Flexible contract lengths", "Coverage for leaves & surges", "Fully credentialed nurses"],
  },
  {
    title: "Permanent Placements",
    description: "Long-term hires who become integral members of your team. We match candidates based on clinical skills, cultural fit, and career goals to reduce turnover.",
    features: ["Thorough candidate matching", "Cultural fit assessment", "Retention-focused placement", "Post-placement support"],
  },
  {
    title: "Specialty Staffing",
    description: "Nurses with advanced training in critical care, emergency, operating room, and other specialized areas. When you need specific expertise, we deliver.",
    features: ["ICU & Critical Care", "Emergency & Trauma", "Operating Room", "Neonatal & Pediatric"],
  },
];

export default function ServicesPage() {
  const servicesRef = useRef<HTMLElement>(null);
  const consultRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Alternating service blocks
      const blocks = servicesRef.current!.querySelectorAll(".service-block");
      blocks.forEach((block, i) => {
        const img = block.querySelector(".service-img");
        const text = block.querySelector(".service-text");

        // Image — clip-path reveal
        gsap.set(img, { clipPath: "inset(6% 6% 6% 6% round 1rem)", autoAlpha: 0 });
        gsap.to(img, {
          clipPath: "inset(0% 0% 0% 0% round 1rem)",
          autoAlpha: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: block, start: "top 75%" },
        });

        // Text — slide from alternate direction
        const direction = i % 2 === 0 ? 30 : -30;
        const children = text!.querySelectorAll(":scope > *");
        gsap.set(children, { x: direction, autoAlpha: 0 });
        gsap.to(children, {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: block, start: "top 70%" },
        });
      });

      // Consultation CTA
      const consultEls = consultRef.current!.querySelectorAll(".consult-animate");
      gsap.set(consultEls, { y: 25, autoAlpha: 0 });
      gsap.to(consultEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: consultRef.current, start: "top 75%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <PageHero
        label="Our Services"
        heading={
          <>
            Staffing solutions{" "}
            <span className="serif-italic text-primary">tailored</span> to your
            facility
          </>
        }
        description="From temporary coverage to permanent hires and specialty staffing, we provide the qualified nursing professionals your facility needs."
      />

      {/* Alternating service blocks — magazine layout */}
      <section ref={servicesRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 space-y-20 md:space-y-28">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-block grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Image — alternates sides */}
              <div
                className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="service-img relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="/hero-nurse.jpg"
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    style={{
                      objectPosition: i === 0 ? "center top" : i === 1 ? "center" : "center bottom",
                    }}
                  />
                </div>
              </div>

              {/* Text */}
              <div
                className={`lg:col-span-6 service-text ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <span className="font-body text-[10px] font-semibold text-primary uppercase tracking-[0.15em]">
                  Service {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading font-black text-display-sm text-foreground mt-2 mb-4">
                  {service.title}
                </h3>
                <p className="font-body text-base text-muted leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 font-body text-sm text-foreground"
                    >
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book Consultation — Full-bleed image */}
      <section ref={consultRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/hero-nurse.jpg"
                alt="Book a consultation"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/55 to-transparent" />
            </div>

            <div className="relative z-10 p-8 md:p-16 max-w-xl min-h-[400px] flex flex-col justify-center">
              <p className="consult-animate font-body text-xs font-semibold text-white/35 uppercase tracking-[0.2em] mb-4">
                Ready to get started?
              </p>
              <h2 className="consult-animate font-heading font-black text-display-md text-white mb-6">
                Book a{" "}
                <span className="serif-italic">consultation</span>
              </h2>
              <p className="consult-animate font-body text-base text-white/50 leading-relaxed mb-8">
                Speak with our team about your staffing needs. We will walk you
                through our process and show you how we can help.
              </p>
              <div className="consult-animate flex flex-col sm:flex-row gap-4">
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-300"
                >
                  Schedule a Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <Link
                  href="/employers/request-staff"
                  className="inline-flex items-center justify-center border border-white/20 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-full hover:border-white/40 transition-colors duration-300"
                >
                  Submit a Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
