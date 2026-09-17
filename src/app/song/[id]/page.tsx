"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/headerSong";
import { Music, Share } from "lucide-react";

import { formatSection } from "@/app/utils/formatSection";
import { shareLink } from "@/app/utils/shareLink";
import songs from "@/app/data/songs.json";

interface SongContentProps {
  params: Promise<{ id: string }>;
}

export default function SongContent({ params }: SongContentProps) {
  const { id } = use(params);
  const songId = parseInt(id);
  const song = songs.find((h) => h.id === songId);

  if (!song) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <Music size={48} className="text-white/30 mx-auto mb-4" />
          <h2 className="text-white/60 text-xl mb-2">Song not found.</h2>
          <Link
            href="/"
            className="text-[#722b41] hover:text-[#C7884A] text-sm"
          >
            Return to collection.
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Header songId={songId} songTitle={song.title} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Song Header */}
        <div className="mb-8 text-center">
          <div className="space-y-4 relative">
            <h1 className="text-black font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-2">
              {song.title.toUpperCase()}
            </h1>
            <p className="text-black/50 text-lg">
              by {song.authors.join(", ")} {!song.year ? "" : `© ${song.year}`}
            </p>
          </div>
        </div>

        {/* Verses Content */}
        <div className="bg-[#722b41]/5 border border-black/10 rounded-lg p-6 sm:p-8 lg:p-12">
          <div className="prose prose-invert max-w-none space-y-8">
            {song.verses.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-[#722b41] font-semibold text-sm uppercase tracking-wide">
                  {formatSection(section)}
                </h3>
                <div className="text-black/90 text-xl leading-relaxed whitespace-pre-line pl-4 border-l border-[#722b41]">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-black/60 text-md">
            Share the link to this song with others:
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => shareLink(song.title)}
              className="flex items-center gap-x-2 px-6 py-2 bg-[#722b41] text-white font-semibold text-sm rounded-full transition-all duration-200"
            >
              <Share size={16} />
              Share Song
            </button>
          </div>
        </div>
        <hr className="my-8 bg-[#722b41]/80" />
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
