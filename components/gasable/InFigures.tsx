"use client";
import { useState, useEffect } from "react";
import CountUp from "@/components/ui/CountUp"; import { getStats } from "@/lib/db"; import type { StatItem } from "@/lib/types";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { Boxes, MapPin, Clock, Leaf, BadgeCheck } from "lucide-react";

const icons = [Boxes, MapPin, Clock, Leaf, BadgeCheck];

export default function InFigures() {
  const [stats, setStats] = useState<StatItem[]>([]); useEffect(() => { getStats().then(setStats); }, []); if (stats.length === 0) return null;
  return (
    <section className="bg-white py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-center font-bold text-4xl md:text-[45px] mb-12">
          <span className="text-brand-green">Petrohub</span>{" "}
                  <span className="text-brand-charcoal-mid">في</</span>{" "}
          <span className="text-[#0067E3]">أرقام</span>
        </h2>

        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((s, i) => { const Icon = icons[i % icons.length]; return (
            <StaggerItem
                        key={s.id}
              lift={false}
                        className="flex flex-col items-center text-center p-6"
            >
              <div className="hover-grow mb-5">
                <Icon size={72} stroke="url(#fl-grad)" strokeWidth={1.5} />
              </div>
              <CountUp
                            value={s.value}
                className="text-6xl md:text-7xl font-black text-gasable-gradient leading-none"
              />
              <p className="text-[#54595F] font-semibold mt-3 text-lg">{s.label}</p>
            </StaggerItem>
                  );
                               })}
        </StaggerGroup>
      </div>
    </section>
  );
}
