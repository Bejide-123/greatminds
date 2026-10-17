"use client";

import { FormEvent, useState } from "react";
import { ShieldCheck, Phone, Mail, Baby } from "lucide-react";
import { CLASS_OPTIONS } from "@/lib/data";

export default function FastInquiry() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="fast-inquiry-box"
      className="w-full py-space-2xl bg-primary text-on-primary relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-gutter-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center relative z-10">
        {/* Left copy */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-white/10 text-amber-300 font-label-md text-label-md self-start border border-white/20">
            <ShieldCheck className="w-4 h-4" />
            Early Bird Registration for 2025/2026 Academic Session
          </div>
          <h2 className="font-headline-xl text-headline-xl sm:text-4xl text-surface font-extrabold leading-tight">
            Give Your Child a Happy, Loving Foundation for a Lifetime of
            Success.
          </h2>
          <p className="font-body-lg text-body-lg text-primary-fixed max-w-xl">
            Speak with our warm admissions counselors today or visit our campus
            located along 17, Olarenwaju Oladunjoye street, off Ilo-Awela RD, Ota, Ogun State, Nigeria. We are here to answer your questions and guide you through the admissions process.
          </p>

          <div className="flex flex-wrap items-center gap-space-lg pt-space-sm text-body-sm text-surface">
            <a
              href="tel:+2348028010867"
              className="flex items-center gap-space-xs hover:text-secondary-fixed transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-surface/10 flex items-center justify-center">
                <Phone className="w-[18px] h-[18px]" />
              </span>
              <span>+234 8028010867 / +234 802319338</span>
            </a>
            <a
              href="mailto:greatmindintl@gmail.com"
              className="flex items-center gap-space-xs hover:text-secondary-fixed transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-surface/10 flex items-center justify-center">
                <Mail className="w-[18px] h-[18px]" />
              </span>
              <span>greatmindintl@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Right form card */}
        <div className="lg:col-span-5 bg-surface-container-lowest text-on-surface p-space-xl rounded-3xl shadow-2xl flex flex-col gap-space-md border border-white/10">
          <div className="flex flex-col gap-space-xs">
            <div className="inline-flex items-center gap-1 text-secondary font-bold text-xs uppercase tracking-wider">
              <Baby className="w-4 h-4" /> Quick Application
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Fast-Track Primary Admission
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Fill this quick form and our Early Years team will call you
              within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-space-sm rounded-xl bg-emerald-50 text-emerald-800 font-body-sm text-body-sm text-center border border-emerald-200">
              Thank you! Our Nursery &amp; Primary admissions coordinator will
              reach out to you shortly.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-space-sm"
            >
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Parent / Guardian Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ngozi Adeleke"
                  className="w-full h-10 px-space-md rounded-xl bg-surface-container-low text-body-md text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    className="w-full h-10 px-space-md rounded-xl bg-surface-container-low text-body-md text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="parent@example.com"
                    className="w-full h-10 px-space-md rounded-xl bg-surface-container-low text-body-md text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Class / Year of Entry
                </label>
                <select className="w-full h-10 px-space-md rounded-xl bg-surface-container-low text-body-md text-on-surface outline-none focus:ring-2 focus:ring-secondary border border-outline-variant/30">
                  {CLASS_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-secondary text-white font-title-md text-title-md hover:bg-orange-600 transition-all shadow-md mt-space-xs font-bold"
              >
                Submit Child Registration &amp; Request Info
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}