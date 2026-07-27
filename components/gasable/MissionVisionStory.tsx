"use client";
import { useLang } from "@/context/LanguageContext";
import GasableButton from "./GasableButton";
import { StaggerGroup, StaggerItem } from "./Stagger";
import { useEffect, useState } from "react";
import { getMissionCards } from "@/lib/db";
import { defaultMissionCards } from "@/lib/store";

const grad = (id: string) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#0C2D6B" />
      <stop offset="100%" stopColor="#0067E3" />
    </linearGradient>
  </defs>
);

const LeafIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g1")}
    <circle cx="50" cy="50" r="38" stroke="url(#g1)" />
    <path
      d="M38 60c0-14 11-26 26-28-1 15-11 27-26 28z"
      stroke="url(#g1)"
      strokeLinejoin="round"
    />
    <path d="M40 58c6-6 13-11 22-13" stroke="url(#g1)" strokeLinecap="round" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g2")}
    <circle cx="50" cy="50" r="18" stroke="url(#g2)" />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4;
      const x1 = 50 + Math.cos(a) * 26;
      const y1 = 50 + Math.sin(a) * 26;
      const x2 = 50 + Math.cos(a) * 36;
      const y2 = 50 + Math.sin(a) * 36;
      return (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#g2)" strokeLinecap="round" />
      );
    })}
  </svg>
);

const HouseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px]" fill="none" strokeWidth="3">
    {grad("g3")}
    <path d="M22 48 50 24l28 24" stroke="url(#g3)" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M30 46v28h40V46" stroke="url(#g3)" strokeLinejoin="round" />
    <path d="M50 70c0-8 5-15 13-16-1 9-6 16-13 16z" stroke="url(#g3)" strokeLinejoin="round" />
  </svg>
);

const icons = [LeafIcon, SunIcon, HouseIcon];

export default function MissionVisionStory() {
  const { lang } = useLang();
  const [cards, setCards] = useState(defaultMissionCards);
  useEffect(() => {
    getMissionCards().then(setCards);
  }, []);
  return (
    <section className="bg-[#F3F6FC] py-[50px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((c, i) => {
            const Icon = icons[i] || LeafIcon;
            return (
              <StaggerItem key={c.id} lift={false} className="text-center flex flex-col items-center">
                <div className="hover-grow mb-5">
                  <Icon />
                </div>
                <h3 className="title-underline text-[22px] font-semibold text-brand-charcoal-mid mb-5">
                  {c.title}
                </h3>
                <p className="text-[#54595F] leading-7 max-w-xs">{c.description}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
        <div className="text-center mt-12">
          <GasableButton href="/about">
            {lang === "ar" ? "اقرأ المزيد" : "Read More"}
          </GasableButton>
        </div>
      </div>
    </section>
  );
}
