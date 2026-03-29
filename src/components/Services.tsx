"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    label: "For nurses",
    title: "Job Placement",
    description:
      "We match you with hospitals, clinics, and care homes across Canada that need your skills. From your first interview to your first shift.",
    href: "/candidates",
    linkText: "Explore opportunities",
    image: "/job-placement.jpg",
  },
  {
    label: "For nurses",
    title: "Mentorship & Training",
    description:
      "CBA & SLA boot camps, 1-on-1 nurse mentorship, career coaching, and upskilling webinars. All built by IEN nurses who've been where you are.",
    href: "/learning",
    linkText: "View programs",
    image: "/mentorship.jpg",
  },
  {
    label: "For employers",
    title: "Employer Partnerships",
    description:
      "We connect healthcare employers with qualified, ready-to-work internationally educated nurses.",
    href: "/employers",
    linkText: "Partner with us",
    image: "/employer-partnership.jpg",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const headerEls = sectionRef.current!.querySelectorAll(".services-header > *");
      gsap.set(headerEls, { y: 25, autoAlpha: 0 });
      gsap.to(headerEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Cards
      const cards = sectionRef.current!.querySelectorAll(".service-card");
      gsap.set(cards, { y: 50, autoAlpha: 0 });
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-section pt-10 md:pt-14">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="services-header max-w-2xl mb-14 md:mb-16">
          <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
            What we do
          </p>
          <h2 className="font-heading font-bold text-display-md text-foreground whitespace-nowrap">
            All you need to work in Canada
          </h2>
        </div>

        {/* Editorial service cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <Link
              key={service.title}
              href={service.href}
              className="service-card group flex flex-col"
            >
              {/* Image */}
              <div className="relative rounded-lg overflow-hidden aspect-[4/3] mb-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectPosition: i === 0 ? "center 30%" : i === 1 ? "center 20%" : "center bottom" }}
                />
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary border border-primary/30 rounded-full px-5 py-2 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary self-end mt-auto">
                {service.linkText}
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
