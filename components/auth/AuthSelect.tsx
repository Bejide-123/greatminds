import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Option = { value: string; label: string };

type AuthSelectProps = {
  id: string;
  label: string;
  icon: ReactNode;
  options: Option[];
  defaultValue?: string;
};

export default function AuthSelect({
  id,
  label,
  icon,
  options,
  defaultValue,
}: AuthSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="font-label-md text-label-md text-on-surface block mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
          {icon}
        </div>
        <select
          id={id}
          defaultValue={defaultValue}
          className="w-full h-10 pl-10 pr-8 rounded-lg bg-surface-container-lowest font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-outline">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}