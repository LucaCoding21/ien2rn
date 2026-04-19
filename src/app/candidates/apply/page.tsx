"use client";

import Link from "next/link";
import EnginehireIframe from "@/components/EnginehireIframe";

const APPLICATION_URL = "https://ien2rn.enginehire.io/application-form/786/28770";

export default function ApplyPage() {

  return (
    <main className="min-h-[100svh] flex flex-col">
      <div className="h-24 sm:h-28 shrink-0" />

      <div className="flex-1 flex flex-col px-5 sm:px-6 md:px-12 pb-16 sm:pb-20">
        <div className="w-full max-w-[900px] mx-auto">
          <Link
            href="/candidates/assessment"
            className="mb-6 inline-flex items-center gap-2 font-body text-sm text-muted hover:text-foreground transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to assessment
          </Link>

          <p className="font-body text-xs font-semibold text-accent uppercase tracking-[0.08em] mb-3">
            Candidate application
          </p>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 leading-tight">
            Create your profile
          </h1>
          <p className="font-body text-base text-muted leading-relaxed mb-10 max-w-xl">
            Complete the form below and our team will begin matching you with healthcare employers across Canada. The form takes about 10–15 minutes.
          </p>
        </div>

        <div className="w-full max-w-[1400px] mx-auto">
          <EnginehireIframe src={APPLICATION_URL} title="Candidate application" />
        </div>
      </div>
    </main>
  );
}
