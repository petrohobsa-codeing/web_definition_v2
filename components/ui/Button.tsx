"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

const variantClasses = {
  primary:
    "bg-brand-green text-white hover:bg-brand-green-mid shadow-lg shadow-brand-green/25 hover:shadow-brand-green/40",
  secondary:
    "bg-white text-brand-green-dark border-2 border-brand-green hover:bg-brand-green-light",
  outline:
    "bg-transparent text-white border-2 border-white hover:bg-white hover:text-brand-green-dark",
  ghost:
    "bg-transparent text-brand-green hover:bg-brand-green-light",
  gold:
    "bg-brand-gold text-white hover:bg-brand-gold-dark shadow-lg shadow-brand-gold/30 hover:shadow-brand-gold/50",
};

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-10 py-4 text-lg",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
