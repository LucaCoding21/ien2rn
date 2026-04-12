"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import BookingModal from "@/components/BookingModal";

const categories = [
  { key: "all", label: "All Professionals" },
  { key: "career", label: "Career Counsellors" },
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
    image: "/team/sheena.jpg",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
    calLink: "https://cal.com/cloverfield/30min",
  },
  {
    name: "Kammy Leung",
    title: "Career Counsellor",
    category: "career",
    specialties: ["Career transitions", "Credential guidance", "Networking strategies"],
    bio: "With a background in healthcare recruitment and counselling, Kammy helps nurses navigate career pivots and identify the right opportunities across provinces.",
    initials: "KL",
    image: "",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
    calLink: "https://cal.com/cloverfield/30min",
  },
  {
    name: "Jeffrey Santos",
    title: "Regulated Canadian Immigration Consultant (RCIC)",
    category: "immigration",
    specialties: ["Work permits", "PR applications", "LMIA support", "Provincial nominees"],
    bio: "Jeffrey is a licensed RCIC who specializes in healthcare worker immigration. He has helped hundreds of nurses secure work permits and permanent residency in Canada.",
    initials: "JS",
    image: "/team/jeffry.jpg",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
    calLink: "https://cal.com/cloverfield/30min",
  },
  {
    name: "Pamela Okafor",
    title: "Immigration & Settlement Consultant",
    category: "immigration",
    specialties: ["Settlement support", "Spousal sponsorship", "Document preparation"],
    bio: "Pamela combines immigration expertise with settlement guidance, helping nurses and their families adjust to life in Canada, from paperwork to finding a community.",
    initials: "PO",
    image: "",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
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
          <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
            {filtered.map((person) => (
              <div
                key={person.name}
                className="pro-card group bg-offwhite rounded-2xl border border-secondary/15 overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-secondary-light flex items-center justify-center">
                      <span className="font-heading font-bold text-5xl text-primary/20">{person.initials}</span>
                    </div>
                  )}
                  {/* Paid badge (desktop only) */}
                  {person.isPaid && (
                    <div className="hidden lg:block absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-secondary/20 rounded-full px-3 py-1">
                      <span className="font-body text-xs font-semibold text-foreground">
                        {person.rate}
                      </span>
                    </div>
                  )}
                  {/* Category badge (desktop only) */}
                  <div className="hidden lg:block absolute bottom-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-sm text-white font-body text-xs font-medium px-3 py-1 rounded-full">
                      {categories.find((c) => c.key === person.category)?.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center lg:items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-xs text-white">
                        {person.initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-base text-foreground leading-tight">
                        {person.name}
                      </h3>
                      <p className="font-body text-xs text-primary font-medium mt-0.5 lg:truncate">
                        {person.title}
                      </p>
                    </div>
                  </div>

                  <p className="font-body text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                    {person.bio}
                  </p>

                  {/* Specialties (desktop only) */}
                  <div className="hidden lg:flex flex-wrap gap-1.5 mb-5">
                    {person.specialties.map((s) => (
                      <span
                        key={s}
                        className="font-body text-xs text-muted bg-secondary-light/50 px-2.5 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-3 mb-4 text-center">
                    <div className="flex-1 bg-secondary-light/40 rounded-lg py-2 px-3">
                      <p className="font-heading font-bold text-sm text-foreground">$59 <span className="font-body text-xs text-muted font-normal">CAD</span></p>
                      <p className="font-body text-xs text-muted">30 min</p>
                    </div>
                    <div className="flex-1 bg-secondary-light/40 rounded-lg py-2 px-3">
                      <p className="font-heading font-bold text-sm text-foreground">$89 <span className="font-body text-xs text-muted font-normal">CAD</span></p>
                      <p className="font-body text-xs text-muted">45 min</p>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => setSelectedProfessional(person)}
                    className="w-full font-body text-sm font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary-dark"
                  >
                    Book a Session
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
