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
  { name: "Sherry", role: "IEN Nurse", video: "/videos/testimony1sherry.mp4" },
];

export default function VideoTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<{ src: string; name: string; role: string } | null>(null);
  const [previewReady, setPreviewReady] = useState(false);

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

  return (
    <>
      <section ref={sectionRef} className="pb-section pt-10 md:pt-14 bg-secondary-light/25">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24">
          <div className="vt-header mb-10 sm:mb-14 md:mb-16">
            <p className="font-body text-sm font-semibold text-accent uppercase tracking-[0.08em] mb-4">
              Stories
            </p>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Hear from our community
            </h2>
          </div>
        </div>

        {/* Video grid */}
        <div className="max-w-[1600px] mx-auto px-5 sm:px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="vt-card group relative rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo({ src: t.video, name: t.name, role: t.role })}
                >
                  {/* Video / Thumbnail */}
                  <div className="relative aspect-video bg-foreground/5">
                    {i === 0 ? (
                      /* First card: 15-second muted autoplay preview */
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
                      /* Other cards: poster frame (first frame of video) */
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

                    {/* Play button */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      i === 0 ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                    }`}>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                        <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Identity bar — bottom of card */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                      <p className="font-heading font-bold text-sm sm:text-base text-white drop-shadow-md">
                        {t.name}
                      </p>
                      <p className="font-body text-xs sm:text-sm text-white/70">
                        {t.role}
                      </p>
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
