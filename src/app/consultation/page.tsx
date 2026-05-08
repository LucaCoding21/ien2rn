"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import BookingModal from "@/components/BookingModal";

const professionals = [
  {
    name: "Jeffrey Lee, MAS, BA",
    title: "Career Consultant",
    category: "career",
    specialties: ["Career coaching & resume improvement", "Professional branding", "Job search strategy"],
    bio: "Jeffrey is a career and professional coaching consultant with over 15 years of experience at institutions including UBC, SFU, and WorkBC. He helps IENs and foreign-trained professionals translate international experience into Canadian contexts and navigate credentialing pathways.",
    initials: "JL",
    image: "/team/jeffry.webp",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
    calLink: "https://cal.com/ien2rnjefflee",
  },
  {
    name: "Kammy Yip, LPN",
    title: "LPN Instructor",
    category: "nursing",
    specialties: ["CBA-SLA Boot Camp", "CELBAN", "Readiness to Practice for LPNs"],
    bio: "Kammy is a Licensed Practical Nurse with over 10 years of nursing experience in Hong Kong and Canada, across acute care, long-term care, and home care. As clinical lead for the ien2RN LPN program, she helps IENs build the clinical competence and confidence needed for Canadian practice.",
    initials: "KY",
    image: "/team/kammy.jpeg",
    imagePosition: "center 25%",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
    calLink: "https://cal.com/ien2rnkammy",
  },
  {
    name: "JM Dineros, RPN",
    title: "RPN Mentor",
    category: "psychiatric",
    specialties: ["RPN Boot Camp", "HCA to RPN-RN transition"],
    bio: "JM is a Registered Psychiatric Nurse currently in acute tertiary mental health at Providence Health Care, with experience across emergency, OB/GYN, medical-surgical, and psychiatric care. He mentors IENs and HCAs navigating the Canadian RPN and RN pathways.",
    initials: "JD",
    image: "/team/john.webp",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
    calLink: "",
  },
  {
    name: "Alice Wong, RN, MHLP",
    title: "RN Educator",
    category: "education",
    specialties: ["CBA-SLA Boot Camp", "Readiness to Practice for RNs", "Simulation-based education"],
    bio: "Alice is a Registered Nurse with active registration in BC, England, the US, and Hong Kong, and nearly 20 years of nursing and education experience. She mentors IENs through clinical practice, simulation teaching, and the transition into Canadian nursing.",
    initials: "AW",
    image: "/team/alice.webp",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
    calLink: "",
  },
  {
    name: "Pamela Dima-ala, MA TESOL",
    title: "Communication Coach",
    category: "communication",
    specialties: ["IELTS", "Cross-cultural communication", "Interview coaching"],
    bio: "Pamela is a career and communication coach with over 20 years of international teaching experience and a Master of Arts in TESOL from Trinity Western University. She helps internationally educated professionals develop clear, confident, and culturally appropriate communication for the Canadian workplace.",
    initials: "PD",
    image: "/team/pamela.png",
    imagePosition: "center 20%",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
    calLink: "https://cal.com/cloverfield/30min",
  },
  {
    name: "Sheena Park, MHLP, RN, CCRP, CHE",
    title: "Recruiter",
    category: "recruitment",
    specialties: ["Recruitment", "Leadership", "Pathways and systems strategy"],
    bio: "Sheena is a BC, Canada and UK RN and Licensed Recruiter with a Master of Health Leadership and Policy from UBC. Her practice spans Emergency, Oncology, Clinical Research, and Quality & Accreditation, and she has mentored IENs throughout her career.",
    initials: "SP",
    image: "/team/sheena.webp",
    isPaid: true,
    rate: "$59/30 min · $89/45 min",
    calLink: "https://cal.com/ien2rnsheena",
  },
];

export default function ConsultationPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<(typeof professionals)[number] | null>(null);

  // Animate cards on mount
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
  }, []);

  return (
    <main>
      {/* Professionals Grid */}
      <section className="py-section bg-secondary-light/20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
          {/* Section heading */}
          <div className="max-w-4xl mb-8">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Our Team
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Accelerate your path to becoming a licensed,{" "}
              <span className="serif-italic text-primary">practice-ready</span>{" "}
              nurse in Canada
            </h2>
          </div>

          {/* Cards Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((person) => (
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
                      style={{ objectPosition: "imagePosition" in person ? person.imagePosition : undefined }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-secondary-light flex items-center justify-center">
                      <span className="font-heading font-bold text-5xl text-primary/20">{person.initials}</span>
                    </div>
                  )}
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
