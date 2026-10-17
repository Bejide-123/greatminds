import { School } from "lucide-react";

export default function AuthMasthead() {
  return (
    <header className="flex flex-col items-center text-center mb-8 lg:mb-12">
      <div className="flex items-center gap-3.5 mb-3">
        <div className="w-14 h-14 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-lg shadow-primary-container/20">
          <School className="w-8 h-8 fill-current" />
        </div>
        <div className="text-left">
          <span className="font-headline-lg text-headline-lg text-primary tracking-tight block leading-tight">
            Greatminds International School
          </span>
          <span className="font-label-md text-label-md text-secondary tracking-widest uppercase">
            Knowledge • Integrity • Excellence
          </span>
        </div>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
        Unified Primary School Portal • Centralized Management System for
        Pupils, Teachers &amp; Institutional Governance
      </p>
    </header>
  );
}