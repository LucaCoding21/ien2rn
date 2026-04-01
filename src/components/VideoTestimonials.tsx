"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videoTestimonials = [
  { name: "Amara O.", role: "Registered Nurse, Toronto", initials: "AO" },
  { name: "Dr. Sarah Chen", role: "Director of Nursing, Vancouver", initials: "SC" },
  { name: "James M.", role: "ICU Nurse, Ottawa", initials: "JM" },
  { name: "Grace T.", role: "LPN, Calgary", initials: "GT" },
  { name: "Priya S.", role: "Nurse Manager, Montreal", initials: "PS" },
];

export default function VideoTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const headerEls = sectionRef.current!.querySelectorAll(".vt-header > *");
      gsap.set(headerEls, { y: 16, autoAlpha: 0 });
      gsap.to(headerEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.75,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Cards
      const cards = sectionRef.current!.querySelectorAll(".vt-card");
      gsap.set(cards, { y: 28, autoAlpha: 0 });
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-section pt-10 md:pt-14 bg-secondary-light/25">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="vt-header mb-14 md:mb-16">
          <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
            Stories
          </p>
          <h2 className="font-heading font-bold text-display-md text-foreground">
            Hear from our community
          </h2>
        </div>
      </div>

      {/* Scrollable row — extends past container edge */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-5 md:gap-6 pl-6 md:pl-16 lg:pl-24 pr-6 md:pr-16 lg:pr-24">
          {videoTestimonials.map((t) => (
            <div
              key={t.name}
              className="vt-card group flex-shrink-0 relative rounded-lg border border-secondary/15 overflow-hidden cursor-pointer"
              style={{ width: "clamp(280px, 30vw, 380px)", aspectRatio: "9/14" }}
            >
              {/* Background layers */}
              <div className="absolute inset-0 bg-secondary-light" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,174,228,0.3)_0%,transparent_70%)]" />

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Identity card */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-white rounded-full px-4 py-2.5 flex items-center gap-3 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-[10px] text-white">
                      {t.initials}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-sm text-foreground truncate">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-muted truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
