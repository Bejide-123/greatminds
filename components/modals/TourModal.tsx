"use client";

import { FormEvent, useEffect, useState } from "react";
import { X, Baby } from "lucide-react";

type TourModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TourModal({ isOpen, onClose }: TourModalProps) {
  const [submitted, setSubmitted] = useState(false);

  // Escape key + scroll lock
  useEffect(() => {
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) setSubmitted(false);
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => onClose(), 2200);
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-gutter-lg"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-modal-title"
    >
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-xl shadow-2xl flex flex-col gap-space-md relative border border-outline-variant/20">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"
        >
          <X className="w-[20px] h-[20px]" />
        </button>

        <div className="flex flex-col gap-space-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-secondary">
            <Baby className="w-[28px] h-[28px]" />
          </div>
          <h3
            id="tour-modal-title"
            className="font-headline-sm text-headline-sm text-primary font-bold"
          >
            Schedule an Assessment Playday
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Come visit our classrooms, playground, and splash pool with your
            little child.
          </p>
        </div>

        {submitted ? (
          <div className="p-space-sm rounded-xl bg-emerald-50 text-emerald-800 font-body-sm text-body-sm text-center border border-emerald-200">
            Thank you! Your child&apos;s campus playday assessment slot has
            been scheduled. Our Early Years coordinator will contact you with
            directions and your welcome kit details.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Parent Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full h-10 px-space-md rounded-xl bg-surface-container-low text-body-md text-on-surface outline-none border border-outline-variant/30 focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Child&apos;s Name &amp; Age
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Liam, 4 years old"
                className="w-full h-10 px-space-md rounded-xl bg-surface-container-low text-body-md text-on-surface outline-none border border-outline-variant/30 focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Preferred Saturday / Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full h-10 px-space-md rounded-xl bg-surface-container-low text-body-md text-on-surface outline-none border border-outline-variant/30 focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Session Slot
                </label>
                <select className="w-full h-10 px-space-md rounded-xl bg-surface-container-low text-body-md text-on-surface outline-none border border-outline-variant/30 focus:ring-2 focus:ring-secondary">
                  <option>Morning (10:00 AM)</option>
                  <option>Midday (12:30 PM)</option>
                  <option>Afternoon (02:00 PM)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-secondary text-white font-title-md text-title-md hover:bg-orange-600 transition-all mt-space-xs font-bold shadow-md shadow-secondary/20"
            >
              Confirm Playday Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}