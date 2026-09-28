import Link from "next/link";
import { ArrowRight, Music } from "lucide-react";

import { SongType } from "@/app/types/song";

type SongCardProps = {
  song: SongType;
};

export default function SongCard({ song }: SongCardProps) {
  return (
    <div className="bg-[#722b41]/10 border border-black/10 rounded-xl p-4 sm:p-6 hover:border-white/20 transition-all duration-200 cursor-pointer">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <Link href={`/song/${song.id}`}>
            <div className="text-[#722b41] flex items-center space-x-2 mb-2">
              <Music size={16} />

              <p className="text-2xl font-bold">{song.id}</p>
            </div>

            <div className="mb-2">
              <h3 className="text-black font-semibold text-lg">
                {song.title.toUpperCase()}
              </h3>
            </div>

            <div className="space-y-1 mb-3">
              <p className="text-black/80 text-sm">
                by {song.authors.join(", ")}{" "}
                <span>{!song.year ? "" : `© ${song.year}`}</span>
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-4 sm:mt-0 sm:ml-6">
          <Link
            href={`/song/${song.id}`}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#722b41] text-white font-semibold text-sm rounded-full transition-all duration-200"
          >
            <span>View Lyrics</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
