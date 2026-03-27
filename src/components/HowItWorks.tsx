"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      const headerEls = sectionRef.current!.querySelectorAll(".hiw-header > *");
      gsap.set(headerEls, { y: 25, autoAlpha: 0 });
      gsap.to(headerEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Bento rows - each row animates in on scroll
      const rows = sectionRef.current!.querySelectorAll(".bento-row");
      rows.forEach((row) => {
        const els = row.querySelectorAll(".bento-item");
        gsap.set(els, { y: 50, autoAlpha: 0 });
        gsap.to(els, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%" },
        });
      });



      // Stat counters
      const statEls = sectionRef.current!.querySelectorAll(".hiw-stat");
      statEls.forEach((el) => {
        const raw = el.getAttribute("data-stat") || "";
        const num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
        const suffix = raw.replace(/[0-9]/g, "");
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: num,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = Math.round(proxy.val) + suffix;
          },
        });
      });

      // Bottom CTA
      const cta = sectionRef.current!.querySelector(".hiw-cta");
      if (cta) {
        gsap.set(cta, { y: 30, autoAlpha: 0 });
        gsap.to(cta, {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: cta, start: "top 85%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-section bg-secondary-light/25">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="hiw-header text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
            Why nurses trust us
          </p>
          <h2 className="font-heading font-black text-display-md text-foreground">
            The hard parts?{" "}
            <span className="serif-italic text-primary">handled.</span>
          </h2>
        </div>

        {/* === ROW 1 - Licensing === */}
        <div className="bento-row grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          {/* Big image - left */}
          <div className="bento-item lg:col-span-7">
            <div className="bento-img relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px]">
              <Image
                src="/empty1.jpg"
                alt="Credential and licensing navigation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>

          {/* Content card - right */}
          <div className="bento-item lg:col-span-5 flex">
            <div className="flex-1 rounded-2xl bg-white p-8 md:p-10 flex flex-col justify-center shadow-sm shadow-black/[0.03]">
              <p className="font-body text-base text-muted italic mb-4">
                &ldquo;I don&apos;t understand the Canadian licensing process&rdquo;
              </p>
              <div className="w-8 h-px bg-primary/25 mb-5" />
              <h3 className="font-heading font-black text-xl md:text-2xl text-foreground mb-4 leading-tight">
                Credential navigation, sorted.
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-8">
                NNAS, CGFNS, provincial regulatory bodies... the alphabet soup
                of Canadian licensing is confusing. We walk you through every
                requirement, every form, every deadline. You focus on nursing.
                We handle the red tape.
              </p>
              <div className="mt-auto flex items-baseline gap-3">
                <p className="hiw-stat font-heading font-black text-4xl text-primary leading-none" data-stat="500+">
                  500+
                </p>
                <p className="font-body text-xs text-muted uppercase tracking-wide">
                  nurses guided<br />through licensing
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* === ROW 2 - Mentorship & Training (reversed) === */}
        <div className="bento-row grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          {/* Content card - left */}
          <div className="bento-item lg:col-span-5 flex order-2 lg:order-1">
            <div className="flex-1 rounded-2xl bg-white p-8 md:p-10 flex flex-col justify-center shadow-sm shadow-black/[0.03]">
              <p className="font-body text-base text-muted italic mb-4">
                &ldquo;I don&apos;t know how to prepare for Canadian nursing practice&rdquo;
              </p>
              <div className="w-8 h-px bg-primary/25 mb-5" />
              <h3 className="font-heading font-black text-xl md:text-2xl text-foreground mb-4 leading-tight">
                Mentorship from nurses who&apos;ve done it.
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-8">
                CBA &amp; SLA boot camps with in-hospital simulation. 1-on-1 mentorship
                from IEN nurses who walked this path. Career coaching, interview prep,
                and upskilling webinars. We don&apos;t just tell you what to do. We
                walk beside you.
              </p>
              <div className="mt-auto flex items-baseline gap-3">
                <p className="hiw-stat font-heading font-black text-4xl text-primary leading-none" data-stat="100+">
                  100+
                </p>
                <p className="font-body text-xs text-muted uppercase tracking-wide">
                  years combined<br />healthcare experience
                </p>
              </div>
            </div>
          </div>

          {/* Big image - right */}
          <div className="bento-item lg:col-span-7 order-1 lg:order-2">
            <div className="bento-img relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px]">
              <Image
                src="/empty2.jpg"
                alt="Mentorship and training session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>
        </div>

        {/* === ROW 3 - Employer matching === */}
        <div className="bento-row grid grid-cols-1 lg:grid-cols-12 gap-5 mb-14 md:mb-16">
          {/* Big image - left */}
          <div className="bento-item lg:col-span-7">
            <div className="bento-img relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px]">
              <Image
                src="/photo3.jpg"
                alt="Employer partnerships and job placement"
                fill
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>

          {/* Content card - right */}
          <div className="bento-item lg:col-span-5 flex">
            <div className="flex-1 rounded-2xl bg-white p-8 md:p-10 flex flex-col justify-center shadow-sm shadow-black/[0.03]">
              <p className="font-body text-base text-muted italic mb-4">
                &ldquo;Finding an employer who&apos;ll hire an IEN feels impossible&rdquo;
              </p>
              <div className="w-8 h-px bg-primary/25 mb-5" />
              <h3 className="font-heading font-black text-xl md:text-2xl text-foreground mb-4 leading-tight">
                Employers who want you.
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-8">
                You&apos;re not cold-applying to hundreds of jobs. Our partner
                hospitals, clinics, and care homes are actively looking for
                internationally educated nurses. We match you based on your
                skills, location preference, and career goals.
              </p>
              <div className="mt-auto flex items-baseline gap-3">
                <p className="hiw-stat font-heading font-black text-4xl text-primary leading-none" data-stat="50+">
                  50+
                </p>
                <p className="font-body text-xs text-muted uppercase tracking-wide">
                  employer partners<br />actively hiring
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="hiw-cta flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-foreground px-8 md:px-10 py-8">
          <div>
            <p className="font-heading font-bold text-lg md:text-xl text-white mb-1">
              Ready to get started?
            </p>
            <p className="font-body text-sm text-white/50">
              Join 500+ nurses already on their way to working in Canada.
            </p>
          </div>
          <Link
            href="/candidates/assessment"
            className="group shrink-0 inline-flex items-center justify-center gap-2.5 font-body font-semibold text-sm px-7 py-3.5 rounded-full bg-primary text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
          >
            Apply Now
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
