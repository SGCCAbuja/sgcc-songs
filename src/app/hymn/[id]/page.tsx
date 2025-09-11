"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Music, Heart, Share } from "lucide-react";
import { Cardo } from "next/font/google";

import { hymns } from "@/app/data/hymns";

const cardo = Cardo({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface HymnDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function HymnDetailPage({ params }: HymnDetailPageProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = use(params);
  const hymnId = parseInt(id);
  const hymn = hymns.find((h) => h.id === hymnId);

  const formatSectionTitle = (section: { type: string; number?: number }) => {
    if (section.type === "verse") {
      return `Verse ${section.number}`;
    }
    return section.type.charAt(0).toUpperCase() + section.type.slice(1);
  };

  if (!hymn) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <Music size={48} className="text-white/30 mx-auto mb-4" />
          <h2 className={`text-white/60 text-xl mb-2 ${cardo.className}`}>
            Hymn not found
          </h2>
          <Link
            href="/"
            className="text-[#722b41] hover:text-[#C7884A] text-sm"
          >
            Return to collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#121212] relative ${cardo.className}`}>
      {/* Subtle radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)",
        }}
      />

      {/* Navigation Bar */}
      <nav className="relative z-50 flex items-center justify-between h-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 border-b border-white/10">
        {/* Back Button and Logo */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Image
              src="/icon.png"
              alt="SGCC Logo Icon"
              width={20}
              height={20}
              className="inline-block mr-8"
            />
            <div className="text-white font-semibold text-lg tracking-wide">
              SGCC Collection of Songs
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full border transition-all duration-200 ${
              isFavorite
                ? "border-[#722b41] bg-[#722b41]/20 text-[#722b41]"
                : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/80"
            }`}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>

          <button className="p-2 rounded-full border border-white/20 text-white/60 hover:border-white/40 hover:text-white/80 transition-all duration-200">
            <Share size={16} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Hymn Header */}
        <div className="mb-8 text-center">
          <div className="space-y-4 relative">
            {/* Bronze rule */}
            <div className="w-14 h-px bg-[#722b41] mx-auto"></div>

            <div>
              <h1 className="text-white font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-2">
                {hymn.title.toUpperCase()}
              </h1>
              <p className="text-[#C7C7C7] text-lg">
                by {hymn.authors.join(", ")} &copy; {hymn.year}
              </p>
            </div>
          </div>
        </div>

        {/* Verses Content */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 sm:p-8 lg:p-12">
          <div className="prose prose-invert max-w-none space-y-8">
            {hymn.verses.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-[#722b41] font-semibold text-sm uppercase tracking-wide">
                  {formatSectionTitle(section)}
                </h3>
                <div className="text-white/90 text-xl leading-relaxed whitespace-pre-line pl-4 border-l border-white/20">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/60 text-sm">
            Share this hymn with others:
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 border border-white/20 text-white text-sm rounded-full hover:border-white/40 hover:bg-white/10 transition-all duration-200">
              Print Hymn
            </button>

            <button className="px-6 py-2 bg-[#722b41] text-[#fffff] font-semibold text-sm rounded-full transition-all duration-200">
              Share Link to Hymn
            </button>
          </div>
        </div>
        <hr className="my-8 border-white/10" />
        <Image
          src="/logo.png"
          alt="SGCC Logo"
          width={150}
          height={150}
          className="flex items-center justify-center mx-auto mt-12"
        />
      </div>
    </div>
  );
}
