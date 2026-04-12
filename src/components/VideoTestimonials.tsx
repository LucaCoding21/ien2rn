"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayerModal from "./VideoPlayerModal";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Sherry", role: "IEN Nurse", video: "/videos/testimony1sherry.mp4" },
  { name: "Sherry", role: "IEN Nurse", video: "/videos/testimony1sherry.mp4" },
  { name: "Sherry", role: "IEN Nurse", video: "/videos/testimony1sherry.mp4" },
  { name: "Sherry", role: "IEN Nurse", video: "/videos/testimony1sherry.mp4" },
];

export default function VideoTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<{ src: string; name: string; role: string } | null>(null);
  const [previewReady, setPreviewReady] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerEls = sectionRef.current!.querySelectorAll(".vt-header > *");
      gsap.set(headerEls, { y: 16, autoAlpha: 0 });
      gsap.to(headerEls, {
        y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      const cards = sectionRef.current!.querySelectorAll(".vt-card");
      gsap.set(cards, { y: 28, autoAlpha: 0 });
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: 0, autoAlpha: 1, duration: 0.4, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // 15-second preview loop for the first card
  const handlePreviewTimeUpdate = useCallback(() => {
    const v = previewRef.current;
    if (v && v.currentTime >= 15) {
      v.currentTime = 0;
    }
  }, []);

  // Start preview when visible via IntersectionObserver
  useEffect(() => {
    const v = previewRef.current;
    if (!v) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(v);
    return () => observer.disconnect();
  }, [previewReady]);

  // Track scroll position for arrow state
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollByDirection = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector(".vt-card") as HTMLElement;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(card.parentElement!).gap) || 16;
    const distance = card.offsetWidth + gap;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, el.scrollLeft + (direction === "right" ? distance : -distance)));
    gsap.killTweensOf(el);
    gsap.to(el, {
      scrollLeft: target,
      duration: 0.6,
      ease: "power3.out",
      onComplete: updateScrollState,
    });
  };

  return (
    <>
      <section ref={sectionRef} className="pb-section pt-10 md:pt-14 bg-secondary-light/25">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24">
          <div className="vt-header mb-10 sm:mb-14 md:mb-16 flex items-end justify-between gap-6">
            <div>
              <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
                Stories
              </p>
              <h2 className="font-heading font-bold text-display-md text-foreground">
                Hear from our community
              </h2>
            </div>

            {/* Desktop arrows — next to heading */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0 pb-1">
              <button
                onClick={() => scrollByDirection("left")}
                disabled={!canScrollLeft}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                  canScrollLeft
                    ? "bg-white text-foreground border border-secondary/20 hover:shadow-md hover:text-primary active:scale-95"
                    : "bg-secondary-light/40 text-muted/30 cursor-default"
                }`}
                aria-label="Previous"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => scrollByDirection("right")}
                disabled={!canScrollRight}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                  canScrollRight
                    ? "bg-white text-foreground border border-secondary/20 hover:shadow-md hover:text-primary active:scale-95"
                    : "bg-secondary-light/40 text-muted/30 cursor-default"
                }`}
                aria-label="Next"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable row */}
        <div className="overflow-hidden">
          <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 sm:gap-6 pl-5 sm:pl-6 md:pl-16 lg:pl-24 pr-5 sm:pr-6 md:pr-16 lg:pr-24">
              {testimonials.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="vt-card group flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer"
                  style={{ width: "clamp(300px, 50vw, 540px)" }}
                  onClick={() => setActiveVideo({ src: t.video, name: t.name, role: t.role })}
                >
                  {/* Video / Thumbnail */}
                  <div className="relative aspect-video bg-foreground/5">
                    {i === 0 ? (
                      <video
                        ref={previewRef}
                        src={t.video}
                        muted
                        playsInline
                        preload="metadata"
                        onLoadedData={() => setPreviewReady(true)}
                        onTimeUpdate={handlePreviewTimeUpdate}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={t.video}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Play button — desktop only (hover) */}
                    <div className={`hidden sm:flex absolute inset-0 items-center justify-center transition-opacity duration-300 ${
                      i === 0 ? "opacity-0 group-hover:opacity-100" : "sm:opacity-0 sm:group-hover:opacity-100"
                    }`}>
                      <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300">
                        <svg className="w-6 h-6 text-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Identity bar — floating bottom bar with play icon on mobile */}
                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 bg-white/95 backdrop-blur-sm rounded-md sm:rounded-lg shadow-sm flex items-center gap-2.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5">
                      {/* Small play icon — mobile only */}
                      <div className="sm:hidden w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white ml-px" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="font-heading font-bold text-xs sm:text-sm text-foreground leading-tight truncate">
                          {t.name}
                        </p>
                        <p className="font-body text-[10px] sm:text-xs text-muted truncate">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    {/* Duration badge — top right */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white font-body text-xs font-medium px-2 py-0.5 rounded">
                      3:00
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile arrows — centered below cards */}
        <div className="sm:hidden flex items-center justify-center gap-3 mt-6 px-5">
          <button
            onClick={() => scrollByDirection("left")}
            disabled={!canScrollLeft}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              canScrollLeft
                ? "bg-white text-foreground border border-secondary/20 active:scale-95"
                : "bg-secondary-light/40 text-muted/30 cursor-default"
            }`}
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scrollByDirection("right")}
            disabled={!canScrollRight}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
              canScrollRight
                ? "bg-white text-foreground border border-secondary/20 active:scale-95"
                : "bg-secondary-light/40 text-muted/30 cursor-default"
            }`}
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* Video player modal */}
      <VideoPlayerModal
        src={activeVideo?.src ?? null}
        name={activeVideo?.name ?? ""}
        role={activeVideo?.role ?? ""}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}
