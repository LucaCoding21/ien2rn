"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Nurse-led, nurse-first",
    description: "Our founders walked the same path you are on. We built ien2RN because we know what it takes.",
  },
  {
    title: "People over process",
    description: "Every nurse has a unique story. We take the time to understand yours and match accordingly.",
  },
  {
    title: "End-to-end support",
    description: "From credential assessment to your first shift and beyond — we are with you the whole way.",
  },
  {
    title: "Bridging cultures",
    description: "We help internationally educated nurses navigate the transition to Canadian healthcare seamlessly.",
  },
];

const team = [
  {
    role: "RN, BScN — Internationally Educated Nurse",
    bio: "With over a decade of frontline nursing experience across multiple countries, our co-founder understands the challenges IENs face. Their journey from international nurse to Canadian healthcare leader drives everything we do.",
    initials: "MP",
  },
  {
    role: "RN, BScN — Internationally Educated Nurse",
    bio: "A passionate advocate for internationally educated nurses, our co-founder combines clinical expertise with a deep commitment to removing barriers to employment in Canadian healthcare.",
    initials: "MP",
  },
];

export default function AboutPage() {
  const missionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mission — image clip-path reveal + text fade
      const missionImg = missionRef.current!.querySelector(".mission-image");
      gsap.set(missionImg, { clipPath: "inset(6% 6% 6% 6% round 1.5rem)", autoAlpha: 0 });
      gsap.to(missionImg, {
        clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
        autoAlpha: 1,
        duration: 1.3,
        ease: "power3.inOut",
        scrollTrigger: { trigger: missionRef.current, start: "top 70%" },
      });

      const missionText = missionRef.current!.querySelectorAll(".mission-text > *");
      gsap.set(missionText, { y: 25, autoAlpha: 0 });
      gsap.to(missionText, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: missionRef.current, start: "top 65%" },
      });

      // Values — stagger from left
      const valueRows = valuesRef.current!.querySelectorAll(".value-row");
      gsap.set(valueRows, { x: -30, autoAlpha: 0 });
      valueRows.forEach((row, i) => {
        gsap.to(row, {
          x: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });

      // Team — scale up
      const teamCards = teamRef.current!.querySelectorAll(".team-card");
      gsap.set(teamCards, { scale: 0.95, autoAlpha: 0 });
      teamCards.forEach((card, i) => {
        gsap.to(card, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.9,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 82%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <PageHero
        label="About Us"
        heading={
          <>
            We&apos;re nurses too. We{" "}
            <span className="serif-italic text-primary">understand</span> your
            journey.
          </>
        }
        description="ien2RN was founded by internationally educated nurses who navigated the same path you are on. We built this company so no nurse has to do it alone."
      />

      {/* Mission — Editorial two-column */}
      <section ref={missionRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="mission-image relative rounded-3xl overflow-hidden aspect-[3/4] shadow-xl shadow-foreground/5">
                <Image
                  src="/hero-nurse.jpg"
                  alt="ien2RN team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="lg:col-span-7 mission-text">
              <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                Our Mission
              </p>
              <h2 className="font-heading font-black text-display-md text-foreground mb-6">
                Bridging the gap between{" "}
                <span className="serif-italic text-primary">talent</span> and{" "}
                <span className="serif-italic text-primary">opportunity</span>
              </h2>
              <p className="font-body text-base text-muted leading-relaxed mb-5">
                Canada&apos;s healthcare system needs qualified nurses. Thousands
                of internationally educated nurses have the skills but face
                barriers getting licensed and employed. We exist to close that
                gap.
              </p>
              <p className="font-body text-base text-muted leading-relaxed mb-10">
                Both of our managing partners are registered nurses who
                immigrated to Canada and went through the credentialing process
                themselves. That lived experience shapes every part of how we
                work.
              </p>

              {/* Stats inline */}
              <div className="flex items-center gap-10">
                {[
                  { value: "500+", label: "Nurses placed" },
                  { value: "50+", label: "Employer partners" },
                  { value: "95%", label: "Satisfaction" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-10">
                    <div>
                      <p className="font-heading font-black text-2xl text-primary leading-none">
                        {stat.value}
                      </p>
                      <p className="font-body text-xs text-muted mt-1">{stat.label}</p>
                    </div>
                    {i < 2 && <div className="w-px h-10 bg-secondary/25" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — Horizontal rows with dividers (NOT cards) */}
      <section ref={valuesRef} className="py-section bg-secondary-light/25">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-14">
            <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
              Our Values
            </p>
            <h2 className="font-heading font-black text-display-md text-foreground">
              What drives{" "}
              <span className="serif-italic text-primary">everything</span> we do
            </h2>
          </div>

          <div className="border-t border-secondary/20">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="value-row grid md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-secondary/20 group"
              >
                <div className="md:col-span-1">
                  <span className="font-heading font-black text-2xl text-secondary/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — Editorial cards */}
      <section ref={teamRef} className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-14">
            <p className="font-body text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-4">
              Our Team
            </p>
            <h2 className="font-heading font-black text-display-md text-foreground">
              Led by nurses, for{" "}
              <span className="serif-italic text-primary">nurses</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {team.map((member, i) => (
              <div key={i} className="team-card group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6">
                  <Image
                    src="/hero-nurse.jpg"
                    alt="Co-founder & Managing Partner"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectPosition: i === 0 ? "center top" : "center" }}
                  />
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-sm text-white">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                      Co-founder & Managing Partner
                    </h3>
                    <p className="font-body text-sm text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="font-body text-sm text-muted leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
