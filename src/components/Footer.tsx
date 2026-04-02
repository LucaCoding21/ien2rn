"use client";

import Link from "next/link";

const footerLinks = {
  "For Nurses": [
    { label: "Find a Job", href: "/candidates" },
    { label: "View Courses", href: "/learning/courses" },
    { label: "Resources", href: "/learning/resources" },
    { label: "Create Profile", href: "/candidates" },
  ],
  "For Employers": [
    { label: "Hire Staff", href: "/employers" },
    { label: "Request Staff", href: "/employers/request-staff" },
    { label: "Book Consultation", href: "/consultation" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Learning", href: "/learning/courses" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="pt-section pb-12 relative bg-offwhite">
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-5">
              <span className="font-heading font-bold text-2xl text-primary">
                ien2RN
              </span>
            </Link>
            <p className="font-body text-sm text-muted leading-relaxed max-w-xs mb-8">
              Helping internationally educated nurses start meaningful
              healthcare careers across Canada.
            </p>

            <div className="space-y-3">
              <a
                href="tel:+16042295549"
                className="flex items-center gap-3 font-body text-sm text-muted hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                (604) 229-5549
              </a>
              <a
                href="mailto:NurseMentor@ien2RN.org"
                className="flex items-center gap-3 font-body text-sm text-muted hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                NurseMentor@ien2RN.org
              </a>
              <p className="flex items-center gap-3 font-body text-sm text-muted">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                </svg>
                Vancouver, British Columbia, Canada
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-2">
              <h4 className="font-heading font-bold text-sm text-foreground mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-muted hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-4 lg:col-span-3 lg:col-start-10">
            <h4 className="font-heading font-bold text-sm text-foreground mb-5">
              Stay connected
            </h4>
            <p className="font-body text-sm text-muted mb-4">
              Get updates on new jobs and helpful resources.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 font-body text-sm px-4 py-3 rounded-full border border-secondary/30 bg-transparent focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shrink-0 hover:bg-primary-dark transition-colors duration-300"
                aria-label="Subscribe"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-secondary/15">
          <p className="font-body text-xs text-muted">
            &copy; {new Date().getFullYear()} ien2RN. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[
              { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
              { name: "X", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="w-9 h-9 rounded-full border border-secondary/25 flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 transition-all duration-300"
                aria-label={social.name}
              >
                <svg
                  className={`${social.name === "X" ? "w-3.5 h-3.5" : "w-4 h-4"}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="font-body text-xs text-muted hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="font-body text-xs text-muted hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
