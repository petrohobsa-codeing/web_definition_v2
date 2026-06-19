"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  company: string;
  delay?: number;
}

export default function TestimonialCard({
  text,
  name,
  role,
  company,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="relative group"
    >
      <div className="h-full bg-white rounded-3xl border border-gray-100 p-8 hover:border-brand-green/20 hover:shadow-xl hover:shadow-brand-green/8 transition-all duration-400">
        {/* Quote icon */}
        <div className="w-12 h-12 rounded-2xl bg-brand-green-light flex items-center justify-center mb-6">
          <Quote size={20} className="text-brand-green" />
        </div>

        <p className="text-brand-charcoal-mid leading-loose text-sm mb-8">
          &ldquo;{text}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green to-brand-green-mid flex items-center justify-center text-white font-black text-lg">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-black text-brand-charcoal text-sm">{name}</p>
            <p className="text-brand-charcoal-light text-xs">
              {role}، {company}
            </p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-brand-gold fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
