"use client";

import { Lock, Eye, EyeOff } from "lucide-react";
import { ReactNode, useState } from "react";

type PasswordInputProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  hint?: ReactNode;
  required?: boolean;
};

export default function PasswordInput({
  id,
  name,
  label,
  placeholder,
  hint,
  required,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="font-label-md text-label-md text-on-surface">
          {label}
        </label>
        {hint}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
          <Lock className="w-5 h-5" />
        </div>
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          className="w-full h-10 pl-10 pr-10 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface"
        >
          {visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}