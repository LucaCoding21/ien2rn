"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

type Variant = "primary" | "white" | "small";

interface ApplyButtonProps {
  href?: string;
  label?: string;
  variant?: Variant;
  className?: string;
}

const variantStyles: Record<Variant, { button: string; arrowColor: string; circle: string }> = {
  primary: {
    button: "text-white text-base pl-10 pr-12 py-4 bg-primary",
    arrowColor: "#1a1a2e",
    circle: "#F5C518",
  },
  white: {
    button: "text-primary text-sm pl-8 pr-10 py-3.5 bg-white",
    arrowColor: "#ffffff",
    circle: "#2832C2",
  },
  small: {
    button: "text-white text-sm pl-7 pr-9 py-3 bg-primary",
    arrowColor: "#1a1a2e",
    circle: "#F5C518",
  },
};

export default function ApplyButton({
  href = "/candidates/assessment",
  label = "Apply Now",
  variant = "primary",
  className = "",
}: ApplyButtonProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const handleEnter = () => {
    const tl = gsap.timeline();
    tl.to(textRef.current, { x: -8, duration: 0.65, ease: "expo.out" })
      .to(circleRef.current, { scale: 1, duration: 0.65, ease: "expo.out" }, 0)
      .to(arrowRef.current, { left: 0, duration: 0.65, ease: "expo.out", delay: -0.55 });
  };

  const handleLeave = () => {
    const tl = gsap.timeline();
    tl.to(textRef.current, { x: 0, duration: 0.65, ease: "expo.out" })
      .to(circleRef.current, { scale: 0, duration: 0.65, ease: "expo.out" }, 0)
      .to(arrowRef.current, { left: "-23px", duration: 0.65, ease: "expo.out", delay: -0.55 });
  };

  const styles = variantStyles[variant];

  return (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-center font-body font-semibold rounded-full ${styles.button} ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span ref={textRef}>{label}</span>
      <div
        ref={circleRef}
        className="absolute right-3 w-[28px] h-[28px] rounded-full overflow-hidden flex items-center justify-center"
        style={{ transform: "scale(0)", transformOrigin: "center", backgroundColor: styles.circle }}
      >
        <svg
          ref={arrowRef}
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[13px] h-[13px]"
          style={{ left: "-23px", position: "relative", fill: styles.arrowColor }}
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M3.82475e-07 5.625L7.625 5.625L4.125 9.125L5 10L10 5L5 -4.37114e-07L4.125 0.874999L7.625 4.375L4.91753e-07 4.375L3.82475e-07 5.625Z" />
        </svg>
      </div>
    </Link>
  );
}
