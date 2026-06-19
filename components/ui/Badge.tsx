import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "green" | "gold" | "outline";
  className?: string;
}

const variantClasses = {
  green: "bg-brand-green-light text-brand-green border border-brand-green/20",
  gold: "bg-brand-gold-light text-brand-gold-dark border border-brand-gold/30",
  outline: "bg-transparent text-brand-green border border-brand-green",
};

export default function Badge({
  children,
  variant = "green",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${variantClasses[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
