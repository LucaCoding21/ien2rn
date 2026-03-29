"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { image: "/empty1.jpg", objectPosition: "center top", flip: false },
  { image: "/Satisfaction-rate.jpg", objectPosition: "center top", flip: false },
  { image: "/employer-partnership2.jpg", objectPosition: "center 30%", flip: true },
];

const stats = [
  { description: "We've guided hundreds of internationally educated nurses through the Canadian licensing process.", stat: "500+", label: "Nurses guided through licensing" },
  { description: "The overwhelming majority of nurses we work with report a positive, stress-free placement experience.", stat: "95%", label: "Satisfaction rate" },
  { description: "Our network of partner hospitals and clinics are actively hiring IENs across Canada.", stat: "50+", label: "Employer partners actively hiring" },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hiw-header > *", { y: 25, autoAlpha: 0 });
      gsap.to(".hiw-header > *", {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Clip-path reveal on scroll for each photo
      const photoEls = sectionRef.current!.querySelectorAll(".hiw-photo");
      photoEls.forEach((photo, i) => {
        gsap.set(photo, { clipPath: "inset(100% 0% 0% 0% round 0.5rem)", autoAlpha: 1 });
        gsap.to(photo, {
          clipPath: "inset(0% 0% 0% 0% round 0.5rem)",
          duration: 1.1,
          ease: "power3.inOut",
          delay: i * 0.15,
          scrollTrigger: { trigger: ".hiw-photos", start: "top 80%" },
        });
      });

      // Parallax on images inside photos as user scrolls
      photoEls.forEach((photo) => {
        const img = photo.querySelector("img");
        if (!img) return;
        gsap.fromTo(img,
          { y: "-8%" },
          {
            y: "8%",
            ease: "none",
            scrollTrigger: {
              trigger: photo,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      gsap.set(".hiw-stat-item", { y: 20, autoAlpha: 0 });
      gsap.to(".hiw-stat-item", {
        y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".hiw-stats", start: "top 88%" },
      });

      const statEls = sectionRef.current!.querySelectorAll(".hiw-stat");
      statEls.forEach((el) => {
        const raw = el.getAttribute("data-stat") || "";
        const num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
        const suffix = raw.replace(/[0-9]/g, "");
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: num, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => { el.textContent = Math.round(proxy.val) + suffix; },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-section pt-10 md:pt-14 bg-secondary-light/25">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">

        {/* Header — two column */}
        <div className="hiw-header flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14 md:mb-16">
          {/* Left — tagline + title */}
          <div className="max-w-xl">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Why nurses trust us
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              We handle the hard parts.
            </h2>
          </div>

          {/* Right — description + CTA */}
          <div className="shrink-0 max-w-sm flex flex-col items-start gap-5">
            <p className="font-body text-sm text-muted leading-relaxed">
              From credentials to job placement, we guide internationally educated nurses every step of the way.
            </p>
            <Link
              href="/candidates/assessment"
              className="inline-flex items-center justify-center font-body font-semibold text-sm px-7 py-3.5 rounded-full bg-primary text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* 3 Photos */}
        <div className="hiw-photos grid grid-cols-3 gap-4 md:gap-6 mb-10">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="hiw-photo relative rounded-lg overflow-hidden aspect-[3/4]"
            >
              <Image
                src={photo.image}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: photo.objectPosition, transform: photo.flip ? "scaleX(-1)" : undefined }}
                sizes="(max-width: 768px) 33vw, 30vw"
              />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="hiw-stats grid grid-cols-3 gap-6 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="hiw-stat-item flex items-center gap-6">
              <div className="flex-1">
                <p className="font-heading font-bold text-base text-foreground mb-2">{s.label}</p>
                <p className="font-body text-sm text-muted leading-relaxed mb-10">{s.description}</p>
                <p
                  className="hiw-stat font-heading font-bold text-4xl md:text-5xl text-primary leading-none"
                  data-stat={s.stat}
                >
                  {s.stat}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-12 bg-secondary/30 shrink-0" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
