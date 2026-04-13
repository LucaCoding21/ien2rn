"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  photo: string | null;
  photoPosition?: string;
  bio: string;
}

const team: TeamMember[] = [
  {
    name: "Sheena Park, RN",
    role: "Founder",
    initials: "SP",
    photo: "/team/sheena.webp",
    bio: "A life-long learner, keen to propel others forward and provide exemplary care, Sheena is a BC, Canada and UK RN with progressive healthcare practice spanning Emergency, ENT, Oncology\u2019s Systemic & Radiation Therapies, Clinical Research & Trials, Clinical & Systems Transformation, Quality, Safety & Accreditation, and Home Health Care.\n\nHer professional journey began as a Senior Analyst for business, technology, and human resources consulting Fortune 300 companies \u2013 Accenture and ADP. She completed the Bachelor of Science in Nursing in the Philippines then had a short but sweet experience in Kuwait, where she was part of the core leadership that prepared and had the hospital awarded with the JCI Accreditation.\n\nSheena studied Overseas Nursing in City, University of London then completed Systemic Anti-Cancer Therapy: Issues in Care and Management from the University of Surrey. She finds her experience in the Royal Surrey NHS as the most gratifying, having been surrounded by excellent mentors whom she credits to have set her up for success.\n\nAfter moving to Canada, she started AllCare Nursing so seniors receive consistently reliable quality care. She mentored IENs as a way to give back whilst working for the Provincial Health Services Authority in different capacities. She has a Master of Health Leadership and Policy from UBC, is a Certified Clinical Research Professional, and a Certified Health Executive.",
  },
  {
    name: "Jeffrey Lee, MAS(L)",
    role: "Manager",
    initials: "JL",
    photo: "/team/jeffry.webp",
    bio: "Jeff is a seasoned career development professional with over 14 years of experience in career coaching and counseling.\n\nHe has worked at esteemed institutions such as UBC, SFU, FDU, and WorkBC, where he gained expertise in career counselling, professional development, career transitioning, job search strategies, workshop development, and industry networking.\n\nJeff has successfully helped a diverse portfolio of clients, ranging from entry-level first-year students to professional job seekers with over 15 years of experience, achieve their career goals. He has also worked extensively with foreign-trained professionals, connecting them to resources and employers in fields such as Health Services, Management, Accounting, Finance, Applied Sciences, IT, and Hospitality.\n\nHe is dedicated to helping IENs and healthcare professionals at ien2RN achieve their employment goals and overcome barriers by connecting them to essential resources and programs.\n\nAdditionally, Jeff engages with healthcare organizations to match employers with qualified and mentored IEN job seekers, addressing various health service talent needs.",
  },
  {
    name: "Alice Wong, RN",
    role: "Educator",
    initials: "AW",
    photo: "/team/alice.webp",
    bio: "Alice holds active RN registration in British Columbia (Canada), England, United States and Hong Kong with healthcare practice spanning from nursing education, critical care nursing, acute medical and surgical nursing, renal nursing, intraoperative nursing to community health care.\n\nShe completed her Bachelor and Master of Science in Nursing in The University of Hong Kong and continued earning her Master\u2019s degree in Health Leadership and Policy in Clinical Education (MHLP \u2013 CE) from the University of British Columbia to enhance her career in nursing education.\n\nAlice has been working in the nursing field for almost 20 years. Before coming to Canada, Alice worked as a nurse educator for 10 years in two of the Universities in Hong Kong. Currently, she is actively practising nursing in a health authority and involved in nursing education at a university in the lower mainland of British Columbia. Her area of expertise and interest is mentoring nursing undergraduates and nurses, as well as simulation teaching.\n\nAlice is fluent in Cantonese, Mandarin, and English. She personally understands the challenges and struggles of internationally educated nurses (IENs). She is dedicated to supporting IENs to starting and continuing their nursing careers here in Canada.",
  },
  {
    name: "Pola",
    role: "IEN Engagement",
    initials: "PO",
    photo: "/team/pola.webp",
    bio: "Pola focuses on the timely communication with IENs. Her professional journey began as an Assistant Operations Manager in the BPO industry. Driven by a desire to expand her expertise, Pola transitioned to become a Quality Assurance Analyst. In this role, she ensured that timely assurance and excellent quality is at the heart of every processes and interactions her team immersed in.\n\nAs someone passionate about supporting others, she is now focused on helping Internationally Educated Nurses (IENs) navigate their career transitions in order to successfully live, work and thrive in their new professional environments.\n\nIf you are interested in learning more about our mentorship, monthly upskilling webinars and exclusive ien2RN resources, Pola is ready to support you. She is also the primary point of contact of IEN Nurses looking for permanent job placements in Canada.",
  },
  {
    name: "Kylie Perrins, RN",
    role: "Manager",
    initials: "KP",
    photo: null,
    bio: "With over two decades of experience in healthcare, Kylie has dedicated her career to improving patient care and fostering professional growth within her teams. Currently, she manages the VGH Simulation Centre at Vancouver Coastal Health, where she has been instrumental in enhancing clinical training programs.\n\nHer journey began in Australia, where she earned her Bachelor of Science in Nursing from the University of Southern Queensland and gained valuable experience as a Registered Nurse at Princess Alexandra Hospital.\n\nAfter moving to Canada, Kylie furthered her education with a High Acuity Nursing Certificate from the British Columbia Institute of Technology and a Master of Arts in Leadership from Royal Roads University.\n\nThroughout her career, she has held various roles including Clinical Nurse Educator and Patient Service Manager, which have honed her skills in leadership and education. As a BLS Instructor with Heart & Stroke, she is passionate about teaching life-saving skills and mentoring the next generation of healthcare professionals.\n\nKylie\u2019s diverse background and commitment to excellence make her a dedicated mentor eager to support and inspire others in their professional journeys.",
  },
  {
    name: "John, RPN",
    role: "Mentor",
    initials: "JO",
    photo: "/team/john.webp",
    photoPosition: "center 60%",
    bio: "John graduated with a Bachelor of Science in Nursing from the University of Santo Tomas \u2013 Legazpi. Following his graduation, he gained experience working in various nursing areas in the Philippines, including the Emergency Department, Obstetrics and Gynecology, Medical-Surgical, and Pediatric Wards. Additionally, he worked as a Jail Nurse, providing care to high-profile populations or Persons Deprived of Liberty (PDL).\n\nIn 2016, he made the courageous decision to immigrate to Canada to join his wife and pursue further professional growth and development. Determined to excel in his chosen field, he enrolled in a Health Care Assistant Diploma program to acclimate himself to the Canadian healthcare system. During this time, he worked for 7 years as a Tertiary Mental Health Worker, gaining valuable experience in the care of patients facing mental health issues.\n\nEager to expand his expertise, he later pursued a degree in Psychiatric Nursing. Throughout this transformative journey, he immersed himself in diverse clinical placements ranging from General Medical Nursing Clinical Practice, Rehabilitation Medical Nursing Clinical Practice, Acute Mental Health Nursing Clinical Practice, Psychosocial Rehabilitation Mental Health Nursing Practicum, Advanced Mental Health Nursing Clinical Practice, to St. Paul\u2019s Hospital Mental Health \u2013 Inpatient 2 North-Psych Unit, in Downtown Vancouver.\n\nToday, as a Registered Psychiatric Nurse (RPN) in the Acute Tertiary Mental Health Unit at Providence Health Care, he is privileged to work alongside a dedicated team of professionals at the forefront of psychiatric care. His role involves providing comprehensive nursing care, implementing therapeutic interventions, and advocating for the holistic well-being of his patients.\n\nWith a commitment to lifelong learning and a passion for promoting mental health awareness, he aspires to make a meaningful impact in the lives of those entrusted to his care. His journey from the Philippines to Canada has not only shaped him professionally but has also enriched his perspective and reinforced his dedication to serving others with empathy, integrity, and resilience.",
  },
  {
    name: "Cates Bayabay, RN",
    role: "Mentor",
    initials: "CB",
    photo: "/team/cates.webp",
    bio: "Cates is an immigrant, a mother of two under two, and a dedicated registered nurse with over 12 years of clinical experience in Thoracic Surgery, Respiratory Medicine, Cardiac Health, Emergency, Community Health, Public Health, and Indigenous Health.\n\nShe has also taken on roles in Health Informatics, Communicable Disease Coordination, and Mass Vaccine Planning and Distribution during the COVID-19 pandemic. She has a particular passion for delivering nursing services in remote and underserved communities.\n\nHer journey into nursing was a paradox. Recognizing the Filipino-nurse stereotype, she tried to resist going into nursing. And now into her thirteenth year, she cannot imagine a better professional identity that aligns with her values: choice, accountability, and community.\n\nHaving lived and worked in remote Arctic communities, Cates understands the value of nurturing and mentoring nurses. She embraces mistakes and strives for excellence even under resource-depleted conditions. To her, mistakes are a gateway to learning and being in resource-poor settings leads to resourcefulness and creativity.\n\nAs a mentor, she hopes to pass on these insights to fellow and future nurses. Her personal mission is to transform the current narrative that \u201cnurses eat their young\u201d to \u201cnurses nurture our young\u201d.",
  },
  {
    name: "Kammy, LPN(c)",
    role: "Mentor",
    initials: "KA",
    photo: null,
    bio: "Kammy holds a higher diploma in Nursing from a tertiary institution in Hong Kong and a valid Enrolled Nurse licensure. Additionally, she has completed a Bachelor\u2019s degree in Health Education.\n\nWith over 10 years of experience in nursing and social welfare sectors, Kammy has worked in various capacities, including in a neurosurgical ward. Her primary focus has been providing long-term care, home health care and health education to the older adults and individuals with special needs as well as school-age children within the community.\n\nIn 2022, Kammy relocated to Vancouver and began the nursing application process as an Internationally Educated Nurse (IEN). Acknowledging the complexity, challenges, and difficulties encountered during this transition, she is dedicated to sharing her experiences and best practices to other IENs going through similar processes.\n\nKammy likes to assist fellow IEN professionals who aspire to move and live in British Columbia, Canada, by offering her lessons learned and industry insights to support them throughout their nursing journeys in Canada.",
  },
  {
    name: "Jo-Ann, RN",
    role: "Mentor",
    initials: "JA",
    photo: null,
    bio: "Jo-Ann completed the Bachelor of Science in Nursing from the Philippines and is a Registered Nurse currently working in the Radiation Oncology department of BC\u2019s largest regional cancer centre. She has extensive clinical experience in multiple settings, having worked for years as a nurse in Ontario before moving to British Columbia where she specialized in caring for persons undergoing cancer therapies.\n\nJo-Ann is an empathic professional who always ensures that every patient she cares for feels valued and listened to. She is also an excellent collaborator and a great support to the physicians and interdisciplinary teams she works closely with.\n\nAs an IEN herself, she can relate to the struggles and adjustments of new nurse immigrants in Canada. She believes that being surrounded with a strong support network along with the desire to learn, improve and be open to new ways of living and practicing nursing are key to successfully adjust, adopt and thrive in a new environment.\n\nNursing is a profession that requires life-long learning, safety in every practice and skills beyond the bedside. As an aspiring nurse in Canada, every IEN will benefit in having a mentor who has lived through a similar journey.",
  },
  {
    name: "Ron, LPN",
    role: "Mentor",
    initials: "RO",
    photo: "/team/ron.webp",
    photoPosition: "center 30%",
    bio: "Ron immigrated to Canada and became an LPN. With 26+ years of Canadian healthcare service, she continuously makes a difference in her workplace and communities. Receiving appreciation for the care she gives and best nursing practices she shares validates that being a nurse by serving others is her calling.\n\nRon has looked after older adults, people recovering from surgeries, those with Multiple Sclerosis, Quadra/Paraplegia, Mental Health concerns, Pregnant women before, during and after deliveries, and individuals needing End-of-Life comfort. She is currently caring for people undergoing Cancer treatments.\n\nShe is involved in supportive partnerships with individuals and their families, tailoring the care they receive in honour of their preferences. She believes in advocating for nursing peers and guiding service users for them not to be lost in and not to be treated as just a number in BC\u2019s complex healthcare system.\n\nRon\u2019s day brightens when people remember her as a nurse and colleague whom they can count on. She has consistently been commended for her care of persons with Cancer and Dementia/Alzheimer\u2019s.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const selectedIndex = selectedMember ? team.findIndex((m) => m.name === selectedMember.name) : -1;
  const goPrev = () => selectedIndex > 0 && setSelectedMember(team[selectedIndex - 1]);
  const goNext = () => selectedIndex < team.length - 1 && setSelectedMember(team[selectedIndex + 1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const heroEls = heroRef.current!.querySelectorAll(".about-hero-anim");
      gsap.set(heroEls, { y: 30, autoAlpha: 0 });
      gsap.to(heroEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        delay: 0.15,
      });

      // Mission
      const missionEls = missionRef.current!.querySelectorAll(".mission-anim");
      gsap.set(missionEls, { y: 25, autoAlpha: 0 });
      missionEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: missionRef.current, start: "top 75%" },
        });
      });

      // Mission photo clip-path reveal (left-to-right)
      const missionPhoto = missionRef.current!.querySelector(".mission-photo");
      if (missionPhoto) {
        gsap.set(missionPhoto, { clipPath: "inset(0 100% 0 0)" });
        gsap.to(missionPhoto, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.6,
          ease: "power3.inOut",
          scrollTrigger: { trigger: missionPhoto, start: "top 75%" },
        });
      }

      // Team
      const teamEls = teamRef.current!.querySelectorAll(".team-member");
      gsap.set(teamEls, { y: 20, opacity: 0 });
      teamEls.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          delay: i * 0.05,
          ease: "power2.out",
          scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
        });
      });


      // Quote
      const quoteEls = quoteRef.current!.querySelectorAll(".quote-anim");
      gsap.set(quoteEls, { y: 25, autoAlpha: 0 });
      gsap.to(quoteEls, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: { trigger: quoteRef.current, start: "top 70%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[85svh] sm:min-h-[85vh] flex items-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/aboutus2.webp"
            alt="The ien2RN team"
            fill
            className="object-cover object-[center_30%]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-foreground/10" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24 pb-12 sm:pb-16 md:pb-20 pt-32 sm:pt-36 md:pt-40">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 sm:gap-8 lg:gap-20">
            {/* Left — tagline + headline */}
            <div className="flex-1">
              <p className="about-hero-anim font-body text-xs sm:text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4 sm:mb-5">
                About ien2RN
              </p>
              <h1
                className="about-hero-anim font-heading font-bold text-white"
                style={{
                  fontSize: "clamp(2rem, 8vw, 3.75rem)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.02em",
                }}
              >
                We&apos;re IEN nurses.
                <br />
                We built what we wished existed.
              </h1>
            </div>

            {/* Right — description */}
            <div className="lg:max-w-sm xl:max-w-md shrink-0">
              <p className="about-hero-anim font-body text-base text-white/60 leading-relaxed">
                ien2RN was founded by internationally educated nurses who lived the
                struggle firsthand, navigating an unfamiliar system without support.
                Today, we provide the mentorship, upskilling, and placement pathways
                we wished had existed when we arrived.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── About intro ── */}
      <section className="pt-section pb-10 md:pb-14 border-b border-secondary/15">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              About ien2RN
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Our story, our mission,<br />our people.
            </h2>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section ref={missionRef} className="py-10 md:py-14">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-6">

            {/* Large photo */}
            <div className="mission-anim mission-photo lg:col-span-7 relative rounded-lg overflow-hidden min-h-[340px] aspect-[4/3] lg:aspect-auto">
              <Image
                src="/realactionshot.webp"
                alt="ien2RN mentorship in action"
                fill
                loading="lazy"
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>

            {/* Dark text panel */}
            <div className="mission-anim lg:col-span-5 bg-foreground rounded-lg px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 flex flex-col justify-between gap-8 sm:gap-10">

              <div>
                <p className="font-body text-xs font-semibold text-accent uppercase tracking-[0.08em] mb-5">
                  Our Mission
                </p>
                <p className="font-heading font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", letterSpacing: "-0.01em" }}
                >
                  Empower IEN integration through mentorship and partner with
                  healthcare organizations to conquer the HHR crisis.
                </p>
              </div>

              <div className="h-px bg-white/10" />

              <div>
                <p className="font-body text-xs font-semibold text-accent uppercase tracking-[0.08em] mb-5">
                  Our Vision
                </p>
                <p className="font-heading font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", letterSpacing: "-0.01em" }}
                >
                  Strengthened and sustainable high quality care for all.
                </p>
                <p className="font-body text-sm text-white/75 leading-relaxed mt-4">
                  When internationally educated nurses are fully supported,
                  patients and communities everywhere benefit.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section ref={teamRef} className="py-section">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-center sm:text-left">
            <div className="mx-auto sm:mx-0">
              <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
                The team
              </p>
              <h2 className="font-heading font-bold text-display-md text-foreground">
                The people behind ien2RN
              </h2>
            </div>
            <p className="font-body text-sm text-muted max-w-xs leading-relaxed md:text-right shrink-0 mx-auto sm:mx-0">
              IEN nurses, educators, and career coaches, each with lived
              experience of the journey.
            </p>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-4">
            {team.map((member) => (
              <button
                key={member.name}
                onClick={() => setSelectedMember(member)}
                className="team-member group text-left cursor-pointer focus:outline-none"
              >
                {/* Photo */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary-light/40 mb-3">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      style={{ objectPosition: member.photoPosition || "center top" }}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading font-bold text-4xl text-primary lg:text-primary/15">
                        {member.initials}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors duration-300 mb-0.5">
                  {member.name.split(",")[0]}
                </h3>
                <p className="font-body text-sm text-primary font-medium lg:text-xs lg:text-muted lg:font-normal">
                  {member.role}
                </p>
              </button>
            ))}
          </div>

          {/* Board of Advisors */}
          <div className="mt-14 pt-10 border-t border-secondary/15">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] shrink-0 lg:text-xs lg:font-normal lg:text-muted">
                Board of Advisors
              </p>
              <div className="flex items-center gap-6">
                <p className="font-heading font-bold text-sm text-foreground">
                  Dr. Sylvain Brousseau
                </p>
                <div className="w-px h-4 bg-secondary/25" />
                <p className="font-heading font-bold text-sm text-foreground">
                  John Kay
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Quote ── */}
      <section ref={quoteRef} className="pt-0 pb-10 md:pb-14">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12">
          <div className="relative rounded-[1.75rem] md:rounded-[3rem] overflow-hidden min-h-[360px] sm:min-h-[400px] md:min-h-[450px]">
            <div className="quote-bg absolute inset-0">
              <Image
                src="/sheenabigphoto.webp"
                alt="ien2RN team"
                fill
                loading="lazy"
                className="object-cover object-[center_20%]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/30 sm:bg-gradient-to-r sm:from-foreground/80 sm:via-foreground/55 sm:to-foreground/25" />
            </div>

            <div className="relative z-10 flex items-end sm:items-center min-h-[360px] sm:min-h-[400px] md:min-h-[450px] px-6 sm:px-8 md:px-16 py-8 sm:py-14">
              <div className="max-w-2xl">
                <svg
                  className="quote-anim w-8 h-8 text-white/15 mb-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11.25 13.441 11.25 15.625 11.25 16.82 10.82 17.926 10.037 18.713 9.254 19.5 8.197 19.929 7.05 19.929c-1.33 0-2.386-.486-2.467-.608zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.986.179 3.645 1.93 3.645 4.114 0 1.195-.43 2.301-1.213 3.088-.783.787-1.84 1.216-2.987 1.216-1.33 0-2.386-.486-2.467-.608z" />
                </svg>
                <p
                  className="quote-anim font-heading font-bold text-white leading-tight mb-8"
                  style={{
                    fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                  }}
                >
                  Because of our innate understanding of the struggles faced by
                  IENs, we built ien2RN to ensure patients, families, and
                  communities truly receive safe, high quality care.
                </p>
                <div className="quote-anim flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                    <Image
                      src="/team/sheena.webp"
                      alt="Sheena Park"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-white">
                      Sheena Park, RN
                    </p>
                    <p className="font-body text-xs text-white/40">
                      Founder, ien2RN
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom links ── */}
      <section className="pt-10 pb-16 md:pb-20">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-12">
          <p className="font-body text-xs font-semibold text-muted/50 uppercase tracking-[0.08em] text-center mb-8">
            Where would you like to go?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/candidates"
              className="group inline-flex items-center justify-between gap-8 w-full sm:w-auto bg-offwhite border border-secondary/20 hover:border-primary/30 rounded-2xl px-6 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <p className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors duration-300">I&apos;m a nurse</p>
                <p className="font-body text-sm text-muted mt-0.5 lg:text-xs lg:text-muted/60">Explore programs & pathways</p>
              </div>
              <svg className="w-4 h-4 text-muted group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/employers"
              className="group inline-flex items-center justify-between gap-8 w-full sm:w-auto bg-offwhite border border-secondary/20 hover:border-primary/30 rounded-2xl px-6 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <p className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors duration-300">I&apos;m an employer</p>
                <p className="font-body text-sm text-muted mt-0.5 lg:text-xs lg:text-muted/60">Find mentored, permanent staff</p>
              </div>
              <svg className="w-4 h-4 text-muted group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Team Member Modal ── */}
      {selectedMember && (
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/60 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          />

          {/* Panel */}
          <div className="relative bg-white w-full md:max-w-2xl shadow-2xl shadow-foreground/20 max-h-[92vh] flex flex-col overflow-hidden">

            {/* Close */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-secondary-light/60 flex items-center justify-center text-muted hover:text-foreground hover:bg-secondary-light transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Identity */}
            <div className="flex items-center gap-6 px-8 pt-8 pb-6 border-b border-secondary/10 shrink-0">
              {/* Portrait photo */}
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-secondary-light/50">
                {selectedMember.photo ? (
                  <Image
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    fill
                    loading="lazy"
                    className="object-cover object-top"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary-light">
                    <span className="font-heading font-bold text-2xl text-primary/25">{selectedMember.initials}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl text-foreground leading-tight">
                  {selectedMember.name}
                </h3>
                <p className="font-body text-xs font-semibold text-accent uppercase tracking-[0.08em] mt-1">
                  {selectedMember.role}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="overflow-y-auto flex-1 px-8 py-6">
              <div className="font-body text-sm text-muted leading-loose space-y-4">
                {selectedMember.bio.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Bottom nav — prev / next */}
            <div className="border-t border-secondary/10 px-6 py-4 flex items-center justify-between gap-4">
              <button
                onClick={goPrev}
                disabled={selectedIndex <= 0}
                className="group flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
              >
                <div className="w-8 h-8 rounded-full border border-secondary/20 group-hover:border-primary/30 flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5 text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </div>
                {selectedIndex > 0 && (
                  <span className="font-body text-xs text-muted group-hover:text-primary transition-colors hidden sm:block">
                    {team[selectedIndex - 1].name.split(",")[0]}
                  </span>
                )}
              </button>

              <span className="font-body text-xs text-muted/40">
                {selectedIndex + 1} / {team.length}
              </span>

              <button
                onClick={goNext}
                disabled={selectedIndex >= team.length - 1}
                className="group flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
              >
                {selectedIndex < team.length - 1 && (
                  <span className="font-body text-xs text-muted group-hover:text-primary transition-colors hidden sm:block">
                    {team[selectedIndex + 1].name.split(",")[0]}
                  </span>
                )}
                <div className="w-8 h-8 rounded-full border border-secondary/20 group-hover:border-primary/30 flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5 text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
