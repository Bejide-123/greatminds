import { ReactNode } from "react";

type AuthInputProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  icon: ReactNode;
  rightSlot?: ReactNode;
  required?: boolean;
  inputMode?: "text" | "email" | "numeric" | "tel";
  maxLength?: number;
  hint?: ReactNode;
};

export default function AuthInput({
  id,
  name,
  label,
  placeholder,
  type = "text",
  icon,
  rightSlot,
  required,
  inputMode,
  maxLength,
  hint,
}: AuthInputProps) {
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
          {icon}
        </div>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          inputMode={inputMode}
          maxLength={maxLength}
          className={`w-full h-10 pl-10 ${
            rightSlot ? "pr-10" : "pr-3"
          } rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-sm`}
        />
        {rightSlot}
      </div>
    </div>
  );
}