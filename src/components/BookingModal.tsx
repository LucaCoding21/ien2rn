"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Professional {
  name: string;
  title: string;
  category: string;
  isPaid?: boolean;
  rate?: string;
  calLink: string;
}

interface BookingModalProps {
  professional: Professional | null;
  onClose: () => void;
}

export default function BookingModal({ professional, onClose }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (!professional) return;
    document.body.style.overflow = "hidden";
    setStep("form");
    setForm({ name: "", email: "", phone: "", message: "" });

    gsap.fromTo(
      overlayRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      panelRef.current,
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out", delay: 0.1 }
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [professional]);

  if (!professional) return null;

  const handleClose = () => {
    gsap.to(panelRef.current, { y: 20, autoAlpha: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.25,
      delay: 0.05,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirm");
  };

  const handleBookCalendar = () => {
    window.open(professional.calLink, "_blank", "noopener,noreferrer");
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center px-3 sm:px-4 pb-3 sm:pb-0">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-foreground/20 overflow-hidden max-h-[90svh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 sm:px-7 pt-6 sm:pt-7 pb-0">
          <div>
            <p className="font-body text-xs font-semibold text-primary uppercase tracking-[0.15em]">
              Book a Session
            </p>
            <h3 className="font-heading font-bold text-lg text-foreground mt-1">
              {professional.name}
            </h3>
            <p className="font-body text-sm text-muted">{professional.title}</p>
          </div>
          <button
            onClick={handleClose}
            className="w-11 h-11 rounded-full border border-secondary/25 flex items-center justify-center text-muted hover:text-foreground hover:border-secondary/50 transition-colors duration-200"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>


        {step === "form" ? (
          <form onSubmit={handleSubmit} className="px-5 sm:px-7 pt-5 sm:pt-6 pb-6 sm:pb-7 space-y-4">
            <div>
              <label className="block font-body text-xs font-semibold text-foreground mb-1.5">
                Full Name
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full font-body text-sm border border-secondary/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-muted/40"
                placeholder="Your full name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs font-semibold text-foreground mb-1.5">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full font-body text-sm border border-secondary/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-muted/40"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="block font-body text-xs font-semibold text-foreground mb-1.5">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full font-body text-sm border border-secondary/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-muted/40"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-xs font-semibold text-foreground mb-1.5">
                What do you need help with?
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full font-body text-sm border border-secondary/25 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-muted/40 resize-none"
                placeholder="Briefly describe what you'd like to discuss..."
              />
            </div>

            <button
              type="submit"
              className="w-full font-body text-sm font-semibold text-white bg-primary rounded-full py-3.5 hover:bg-primary-dark transition-colors duration-300 mt-2"
            >
              {professional.isPaid ? "Continue to Payment & Scheduling" : "Continue to Scheduling"}
            </button>
          </form>
        ) : (
          <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-6 sm:pb-7">
            {/* Confirmation step */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200/50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-heading font-bold text-lg text-foreground mb-1">
                Almost there!
              </h4>
              <p className="font-body text-sm text-muted leading-relaxed">
                Your details have been noted. Now select a time that works for you on {professional.name}&apos;s calendar.
              </p>
              {professional.isPaid && (
                <p className="font-body text-xs text-amber-700 bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-2 mt-3">
                  You&apos;ll be asked to complete payment ({professional.rate}) to confirm your booking.
                </p>
              )}
            </div>

            <button
              onClick={handleBookCalendar}
              className="w-full font-body text-sm font-semibold text-white bg-primary rounded-full py-3.5 hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {professional.isPaid ? "Pay & Choose a Time" : "Choose a Time on Cal.com"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </button>

            <button
              onClick={() => setStep("form")}
              className="w-full font-body text-sm font-medium text-muted mt-3 py-2 hover:text-foreground transition-colors duration-200"
            >
              Go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
