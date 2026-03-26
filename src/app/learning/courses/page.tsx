"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    title: "NCLEX-RN Comprehensive Review",
    category: "Exam Prep",
    description: "A thorough review covering all NCLEX-RN content areas with practice questions and test-taking strategies.",
    duration: "12 weeks",
    level: "All levels",
    featured: true,
  },
  {
    title: "Canadian Healthcare System Orientation",
    category: "Orientation",
    description: "Understand the Canadian healthcare system — provincial regulations, scope of practice, and workplace culture.",
    duration: "4 weeks",
    level: "Beginner",
  },
  {
    title: "Clinical Skills Refresher",
    category: "Clinical",
    description: "Refresh and update your clinical skills for Canadian practice. Covers medication administration, wound care, and more.",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    title: "ICU & Critical Care Fundamentals",
    category: "Specialty",
    description: "Foundational course for nurses entering critical care. Hemodynamic monitoring, ventilator management, and critical meds.",
    duration: "8 weeks",
    level: "Advanced",
  },
  {
    title: "Communication in Canadian Healthcare",
    category: "Professional Development",
    description: "Build communication skills for patient interactions, interdisciplinary teams, and documentation.",
    duration: "3 weeks",
    level: "All levels",
  },
  {
    title: "Leadership in Nursing",
    category: "Professional Development",
    description: "Develop leadership and management skills. Conflict resolution, delegation, quality improvement, and team dynamics.",
    duration: "5 weeks",
    level: "Intermediate",
  },
];

export default function CoursesPage() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured — clip-path reveal
      gsap.set(featuredRef.current, { clipPath: "inset(4% 4% 4% 4% round 1.5rem)", autoAlpha: 0 });
      gsap.to(featuredRef.current, {
        clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
        autoAlpha: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: featuredRef.current, start: "top 80%" },
      });

      // Grid cards — staggered
      const cards = gridRef.current!.querySelectorAll(".course-card");
      gsap.set(cards, { y: 35, autoAlpha: 0 });
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const featured = courses.find((c) => c.featured);
  const regular = courses.filter((c) => !c.featured);

  return (
    <main>
      <PageHero
        label="Courses"
        heading={
          <>
            Professional development courses to{" "}
            <span className="serif-italic text-primary">advance your career</span>
          </>
        }
        description="Browse our catalog of courses designed for internationally educated nurses. All courses are delivered through our external learning platform."
      />

      <section className="py-section">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {/* Featured Course — full-width banner */}
          {featured && (
            <div
              ref={featuredRef}
              className="relative rounded-3xl overflow-hidden mb-14"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative min-h-[250px] md:min-h-[380px]">
                  <Image
                    src="/hero-nurse.jpg"
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-primary p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-white/[0.03] -translate-y-1/3 translate-x-1/4" />
                  <div className="relative z-10">
                    <span className="font-body text-[10px] font-semibold text-white/40 uppercase tracking-wider">
                      Featured · {featured.category}
                    </span>
                    <h3 className="font-heading font-black text-2xl md:text-3xl text-white mt-2 mb-4">
                      {featured.title}
                    </h3>
                    <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
                      {featured.description}
                    </p>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="font-body text-xs text-white/35 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {featured.duration}
                      </span>
                      <span className="font-body text-xs text-white/35">
                        {featured.level}
                      </span>
                    </div>
                    <a
                      href="https://moodle.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white text-primary font-body font-semibold text-sm px-7 py-3 rounded-full hover:bg-white/90 transition-colors duration-300"
                    >
                      Get Started
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Course Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {regular.map((course) => (
              <div key={course.title} className="course-card group">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-5">
                  <Image
                    src="/hero-nurse.jpg"
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="font-body text-[10px] font-semibold text-primary bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed mb-4">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-body text-xs text-muted flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                  <span className="font-body text-xs text-muted">{course.level}</span>
                </div>
                <a
                  href="https://moodle.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-300 group/link"
                >
                  Get Started
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {/* Info note */}
          <div className="mt-14 flex items-start gap-4 p-5 rounded-xl bg-secondary-light/30">
            <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p className="font-body text-sm text-muted leading-relaxed">
              Clicking &ldquo;Get Started&rdquo; takes you to our external learning
              platform where you can register, enroll, and complete your course.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
