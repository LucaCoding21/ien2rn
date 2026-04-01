"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navLinks: NavLink[] = [
  { label: "For Candidates", href: "/candidates" },
  {
    label: "For Employers",
    href: "/employers",
    children: [
      { label: "Why ien2RN", href: "/employers" },
      { label: "Request Staff", href: "/employers/request-staff" },
    ],
  },
  {
    label: "Learning",
    href: "/learning",
    children: [
      { label: "View Courses", href: "/learning/courses" },
      { label: "Resources", href: "/learning/resources" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      if (currentY > lastScrollY.current && currentY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    gsap.set(el, { y: -20 });
    gsap.to(el, {
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-200"
        style={{
          paddingTop: scrolled ? "0.5rem" : "1rem",
          transform: visible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div
          className={`max-w-[1400px] mx-auto flex items-center justify-between transition-all duration-500 rounded-full px-4 md:px-8  ${
            scrolled ? "py-2.5" : "py-4"
          }`}
          style={{ backgroundColor: "#2832C2" }}
        >
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="font-heading font-bold text-2xl tracking-tight text-white">
              ien2RN
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.children && (
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      openDropdown === link.label
                        ? "opacity-100 pointer-events-auto translate-y-0"
                        : "opacity-0 pointer-events-none -translate-y-2"
                    }`}
                  >
                    <div className="bg-offwhite rounded-2xl shadow-xl shadow-black/10 border border-secondary/15 py-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`block px-5 py-2.5 font-body text-sm transition-colors duration-200 ${
                            pathname === child.href
                              ? "text-primary font-semibold bg-secondary-light/50"
                              : "text-foreground hover:text-primary hover:bg-secondary-light/30"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/consultation"
              className="font-body text-sm font-semibold text-white border border-white/40 px-6 py-2 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Book a Consultation
            </Link>
            <Link
              href="/candidates/assessment"
              className="font-body text-sm font-semibold text-primary bg-white px-6 py-2 rounded-full hover:bg-white/90 transition-all duration-300"
            >
              Get Hired
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-[1.5px] transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[4.5px] bg-foreground" : "bg-white"
              }`}
            />
            <span
              className={`w-6 h-[1.5px] transition-all duration-300 ${
                mobileOpen ? "opacity-0 bg-foreground" : "bg-white"
              }`}
            />
            <span
              className={`w-6 h-[1.5px] transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[4.5px] bg-foreground" : "bg-white"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 lg:hidden flex flex-col justify-center px-12 overflow-y-auto ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-6 py-24">
          {navLinks.map((link, i) => (
            <div key={link.label} className="overflow-hidden">
              <div className="flex items-center gap-2">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-heading font-bold text-3xl text-foreground hover:text-primary transition-colors"
                  style={{
                    transform: mobileOpen ? "translateY(0)" : "translateY(100%)",
                    transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s`,
                  }}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                    }
                    className="p-2 text-muted hover:text-primary transition-colors"
                    style={{
                      transform: mobileOpen ? "translateY(0)" : "translateY(100%)",
                      transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s`,
                    }}
                  >
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${
                        mobileExpanded === link.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {/* Mobile sub-items */}
              {link.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileExpanded === link.label ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <div className="pl-4 space-y-3 border-l-2 border-secondary/30">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block font-body text-lg text-muted hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="pb-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/consultation"
            onClick={() => setMobileOpen(false)}
            className="inline-block font-body text-base font-semibold text-primary border-2 border-primary px-8 py-4 rounded-full text-center"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
            }}
          >
            Book a Consultation
          </Link>
          <Link
            href="/candidates/assessment"
            onClick={() => setMobileOpen(false)}
            className="inline-block font-body text-base font-semibold text-white bg-primary px-8 py-4 rounded-full text-center"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            Get Hired
          </Link>
        </div>
      </div>
    </>
  );
}
