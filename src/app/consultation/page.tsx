"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import BookingModal from "@/components/BookingModal";

const categories = [
  { key: "all", label: "All Professionals" },
  { key: "career", label: "Career Counsellors" },
  { key: "mentor", label: "Nursing Mentors" },
  { key: "immigration", label: "Immigration Consultants" },
];

const professionals = [
  {
    name: "Sheena Ramirez",
    title: "Career Counsellor",
    category: "career",
    specialties: ["Resume building", "Interview prep", "Job placement strategy"],
    bio: "Sheena has placed over 200 internationally educated nurses into Canadian healthcare roles. She specializes in helping IENs present their unique strengths to Canadian employers.",
    initials: "SR",
    image: "/hero-nurse.jpg",
    calLink: "https://cal.com/cloverfield/30min",
  },
  {
    name: "Kammy Leung",
    title: "Career Counsellor",
    category: "career",
    specialties: ["Career transitions", "Credential guidance", "Networking strategies"],
    bio: "With a background in healthcare recruitment and counselling, Kammy helps nurses navigate career pivots and identify the right opportunities across provinces.",
    initials: "KL",
    image: "/hero-nurse.jpg",
    calLink: "https://cal.com/cloverfield/30min",
  },
  {
    name: "Priya Desai",
    title: "Nursing Mentor | RN, BScN",
    category: "mentor",
    specialties: ["Clinical integration", "CBA & SLA preparation", "Workplace culture coaching"],
    bio: "An internationally educated nurse herself, Priya walked the IEN-to-RN path and now mentors new nurses through the clinical and cultural transition to Canadian practice.",
    initials: "PD",
    image: "/hero-nurse.jpg",
    calLink: "https://cal.com/cloverfield/30min",
  },
  {
    name: "Grace Adeyemi",
    title: "Nursing Mentor | RN, MN",
    category: "mentor",
    specialties: ["Exam strategies", "Competency assessments", "Confidence building"],
    bio: "Grace brings 12 years of Canadian nursing experience and a Master's in Nursing. She focuses on bridging the gap between international training and Canadian practice expectations.",
    initials: "GA",
    image: "/hero-nurse.jpg",
    calLink: "https://cal.com/cloverfield/30min",
  },
  {
    name: "Jeffrey Santos",
    title: "Regulated Canadian Immigration Consultant (RCIC)",
    category: "immigration",
    isPaid: true,
    rate: "$150/hr",
    specialties: ["Work permits", "PR applications", "LMIA support", "Provincial nominees"],
    bio: "Jeffrey is a licensed RCIC who specializes in healthcare worker immigration. He has helped hundreds of nurses secure work permits and permanent residency in Canada.",
    initials: "JS",
    image: "/hero-nurse.jpg",
    calLink: "https://cal.com/cloverfield/30min",
  },
  {
    name: "Pamela Okafor",
    title: "Immigration & Settlement Consultant",
    category: "immigration",
    isPaid: true,
    rate: "$125/hr",
    specialties: ["Settlement support", "Spousal sponsorship", "Document preparation"],
    bio: "Pamela combines immigration expertise with settlement guidance, helping nurses and their families adjust to life in Canada, from paperwork to finding a community.",
    initials: "PO",
    image: "/hero-nurse.jpg",
    calLink: "https://cal.com/cloverfield/30min",
  },
];

export default function ConsultationPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProfessional, setSelectedProfessional] = useState<(typeof professionals)[number] | null>(null);

  const filtered =
    activeCategory === "all"
      ? professionals
      : professionals.filter((p) => p.category === activeCategory);

  // Animate cards on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".pro-card");
    gsap.set(cards, { y: 20, autoAlpha: 0 });
    gsap.to(cards, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      stagger: 0.07,
      ease: "power2.out",
    });
  }, [activeCategory]);

  return (
    <main>
      {/* Professionals Grid */}
      <section className="py-section bg-secondary-light/20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          {/* Section heading */}
          <div className="max-w-2xl mb-8">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Our Team
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Meet your{" "}
              <span className="serif-italic text-primary">consultants</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`font-body text-sm font-medium px-5 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-muted border-secondary/25 hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((person) => (
              <div
                key={person.name}
                className="pro-card group bg-offwhite rounded-2xl border border-secondary/15 overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Paid badge */}
                  {person.isPaid && (
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-secondary/20 rounded-full px-3 py-1">
                      <span className="font-body text-xs font-semibold text-foreground">
                        {person.rate}
                      </span>
                    </div>
                  )}
                  {/* Category badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-sm text-white font-body text-xs font-medium px-3 py-1 rounded-full">
                      {categories.find((c) => c.key === person.category)?.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-xs text-white">
                        {person.initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-base text-foreground leading-tight">
                        {person.name}
                      </h3>
                      <p className="font-body text-xs text-primary font-medium mt-0.5 truncate">
                        {person.title}
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                    {person.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {person.specialties.map((s) => (
                      <span
                        key={s}
                        className="font-body text-[11px] text-muted bg-secondary-light/50 px-2.5 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => setSelectedProfessional(person)}
                    className={`w-full font-body text-sm font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                      person.isPaid
                        ? "bg-foreground text-white hover:bg-foreground/90"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    {person.isPaid ? (
                      <>
                        Book Paid Session
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Book Free Session
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      {/* Booking Modal */}
      <BookingModal
        professional={selectedProfessional}
        onClose={() => setSelectedProfessional(null)}
      />
    </main>
  );
}
