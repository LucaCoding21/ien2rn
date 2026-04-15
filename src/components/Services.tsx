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
    title: "Training & Development",
    description:
      "We equip you in choosing the best pathway to work and live in Canada. Our programs are carefully developed by nurses who have been where you are.",
    href: "/learning/courses",
    linkText: "View programs",
    image: "/mentorship.webp",
  },
  {
    label: "For nurses",
    title: "Job Placement",
    description:
      "We help you embark on your new nursing journey - from frontline nursing in an acute or community setting to nursing leadership. Our guidance goes beyond your first shift.",
    href: "/candidates",
    linkText: "Learn more",
    image: "/job-placement.webp",
  },
  {
    label: "For employers",
    title: "Employer Partnerships",
    description:
      "We partner with you in curating the workforce solution for your desired outcome. From recruitment to retention, you have options.",
    href: "/employers",
    linkText: "Partner with us",
    image: "/employer-partnership.webp",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header – slide in from the left
      const headerEls = sectionRef.current!.querySelectorAll(".services-header > *");
      gsap.set(headerEls, { x: -40, autoAlpha: 0 });
      gsap.to(headerEls, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Cards – alternating slide directions (odd from left, even from right)
      const cards = sectionRef.current!.querySelectorAll(".service-card");
      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -30 : 30;
        gsap.set(card, { x: fromX, opacity: 0 });
        gsap.to(card, {
          x: 0,
          autoAlpha: 1,
          duration: 0.5,
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
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="services-header max-w-2xl mb-10 sm:mb-14 md:mb-16">
          <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
            What we do
          </p>
          <h2 className="font-heading font-bold text-display-md text-foreground lg:whitespace-nowrap">
            All you need to thrive in Canada
          </h2>
        </div>

        {/* Editorial service cards */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-6 lg:gap-8">
          {services.map((service, i) => (
            <Link
              key={service.title}
              href={service.href}
              className="service-card group flex flex-col"
            >
              {/* Image */}
              <div className="relative rounded-lg overflow-hidden aspect-[3/2] md:aspect-[4/3] mb-6 order-2 md:order-1">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectPosition: i === 0 ? "center 30%" : i === 1 ? "center 20%" : "center bottom" }}
                />
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300 order-1 md:order-2">
                {service.title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-4 flex-1 order-3">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary border border-primary/30 rounded-full px-5 py-2 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary self-end mt-1 md:mt-auto order-4">
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
