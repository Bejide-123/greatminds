import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "secondary" | "primary" | "surface" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: ReactNode;
  iconRight?: ReactNode;
  as?: "button" | "a";
  href?: string;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  secondary:
    "bg-secondary text-white hover:bg-orange-600 shadow-md shadow-secondary/20",
  primary: "bg-primary text-on-primary hover:bg-primary-container shadow-md",
  surface:
    "bg-surface-container text-primary hover:bg-surface-container-high border border-outline-variant/40",
  ghost:
    "bg-surface-container text-primary hover:bg-surface-container-high border border-outline-variant/30",
};

export default function Button({
  variant = "secondary",
  icon,
  iconRight,
  children,
  className = "",
  as = "button",
  href,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-space-xs px-space-lg py-2.5 rounded-xl font-label-md text-label-md transition-all font-semibold hover:scale-105 active:scale-95";
  const classes = `${base} ${VARIANT_CLASSES[variant]} ${className}`;

  if (as === "a") {
    return (
      <a href={href} className={classes}>
        {icon}
        {children}
        {iconRight}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}