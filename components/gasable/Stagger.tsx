"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

/** Container that staggers the reveal of its StaggerItem children. */
export function StaggerGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.13 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Single item that fades/slides up and lifts on hover. */
export function StaggerItem({
  children,
  className = "",
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 36 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
      }}
      whileHover={lift ? { y: -8, transition: { duration: 0.25 } } : undefined}
    >
      {children}
    </motion.div>
  );
}
