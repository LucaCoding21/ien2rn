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
      gsap.set(imgWrap, { clipPath: "inset(4% 4% 4% 4% round 2rem)", autoAlpha: 0 });
      gsap.to(imgWrap, {
        clipPath: "inset(0% 0% 0% 0% round 2rem)",
        autoAlpha: 1,
        duration: 1.3,
        ease: "power3.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      // Content
      const contentEls = sectionRef.current!.querySelectorAll(".trust-content > *");
      gsap.set(contentEls, { y: 30, autoAlpha: 0 });
      gsap.to(contentEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-section">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="trust-image relative rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[500px] md:min-h-[600px]">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/aboutus2.jpg"
              alt="Our team of internationally educated nurses"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="trust-content relative z-10 flex flex-col justify-center min-h-[500px] md:min-h-[600px] p-8 md:p-16 max-w-xl">
            <p className="font-body text-xs font-semibold text-white/40 uppercase tracking-[0.2em] mb-5">
              Who we are
            </p>
            <h2 className="font-heading font-black text-display-md text-white mb-6">
              We&apos;re nurses too. We{" "}
              <span className="serif-italic">understand</span>{" "}
              your journey.
            </h2>
            <p className="font-body text-base text-white/55 leading-relaxed mb-10">
              ien2RN was started by internationally educated nurses who moved
              to Canada, just like you. We know how hard it is. We built
              this company so you don&apos;t have to do it alone.
            </p>

            {/* Quote */}
            <blockquote className="border-l-2 border-white/25 pl-6">
              <p className="font-serif text-xl md:text-2xl italic text-white/85 leading-snug mb-5">
                &ldquo;Every nurse we place carries a story of resilience.
                Our job is to give that story its next chapter.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                  <span className="font-heading font-bold text-xs text-white">
                    FT
                  </span>
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-white">
                    Founding Team
                  </p>
                  <p className="font-body text-xs text-white/35">ien2RN</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
