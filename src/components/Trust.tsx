"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      const imgWrap = sectionRef.current!.querySelector(".trust-image");
      gsap.set(imgWrap, { clipPath: "inset(4% 4% 4% 4% round 0.5rem)", autoAlpha: 0 });
      gsap.to(imgWrap, {
        clipPath: "inset(0% 0% 0% 0% round 0.5rem)",
        autoAlpha: 1,
        duration: 0.6,
        ease: "power3.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Content
      const contentEls = sectionRef.current!.querySelectorAll(".trust-content > *");
      gsap.set(contentEls, { y: 30, autoAlpha: 0 });
      gsap.to(contentEls, {
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

          {/* Left — Image placeholder */}
          <div className="trust-image lg:col-span-7 relative rounded-lg overflow-hidden aspect-[16/10] sm:aspect-[4/3] bg-gray-200 flex items-center justify-center order-2 lg:order-1">
            <p className="font-body text-sm text-gray-500 text-center px-6">PUT COMPANY PHOTO OR GROUP PHOTO HERE</p>
          </div>

          {/* Right — Content */}
          <div className="trust-content lg:col-span-5 flex flex-col justify-center order-1 lg:order-2">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-5">
              Who we are
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground mb-6">
              We&apos;re nurses too. We understand your journey.
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              ien2RN was started by internationally educated nurses who moved
              to Canada, just like you. We know how hard it is. We built
              this company so you don&apos;t have to do it alone.
            </p>

            {/* Quote */}
            <blockquote className="border-l-2 border-primary/25 pl-6 mt-4">
              <p className="font-body text-lg md:text-xl italic text-foreground/70 leading-snug mb-5">
                &ldquo;Every nurse we place carries a story of resilience.
                Our job is to give that story its next chapter.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image
                    src="/team/sheena.jpg"
                    alt="Sheena Park"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-foreground">Sheena Park, RN</p>
                  <p className="font-body text-xs text-muted">Founder, ien2RN</p>
                </div>
              </footer>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}
