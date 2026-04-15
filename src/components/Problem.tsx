"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      const imgWrap = sectionRef.current!.querySelector(".problem-image");
      gsap.set(imgWrap, { clipPath: "inset(4% 4% 4% 4% round 0.5rem)", opacity: 0 });
      gsap.to(imgWrap, {
        clipPath: "inset(0% 0% 0% 0% round 0.5rem)",
        autoAlpha: 1,
        duration: 0.6,
        ease: "power3.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Main heading — slide in from left
      const heading = sectionRef.current!.querySelector(".problem-content h2");
      gsap.set(heading, { x: -40, autoAlpha: 0 });
      gsap.to(heading, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      // Remaining content — fade up
      const otherEls = sectionRef.current!.querySelectorAll(".problem-content > *:not(h2)");
      gsap.set(otherEls, { y: 30, autoAlpha: 0 });
      gsap.to(otherEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-section pt-10 md:pt-14">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left — Content */}
          <div className="problem-content lg:col-span-5 flex flex-col justify-center order-1 lg:order-1">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-5">
              The Gap
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground mb-6">
              IENs have years of nursing experience.
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-4">
              But in Canada, the path to practice is complex (credentialing,
              exams, and immigration), often with no clear direction, no
              guaranteed employment, and no one in your corner.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              Meanwhile, healthcare employers across the country are critically
              short-staffed, seeking nurses who are not only licensed, but truly
              ready to practice in the Canadian care environment.
            </p>
            <p className="font-heading font-bold text-base sm:text-lg text-foreground">
              This is the gap. This is where ien2RN leads.
            </p>
          </div>

          {/* Right — Image */}
          <div className="problem-image lg:col-span-7 relative rounded-lg overflow-hidden aspect-[16/10] sm:aspect-[4/3] order-2 lg:order-2">
            <Image
              src="/empty1.webp"
              alt="Navigating complex credentialing paperwork"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
