import { useState, useEffect} from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Heart } from "lucide-react";

interface HeaderProps {
  songId: number;
  songTitle: string;
}

export default function Header({songId, songTitle}: HeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorite = localStorage.getItem("favoriteSongs");
    const favoriteSongs: number[] = storedFavorite ? JSON.parse(storedFavorite) : [];
    setIsFavorite(favoriteSongs.includes(songId));
  }, [songId]);

  const handleClick = () => {
    const storedFavorite = localStorage.getItem("favoriteSongs");
   let favoriteSongs = storedFavorite ? JSON.parse(storedFavorite) : [];
    if (!isFavorite) {
    // Add this song
    favoriteSongs.push(songId );
  } else {
    // Remove this song
    favoriteSongs = favoriteSongs.filter((id) => id !== songId);
  }
    setIsFavorite(!isFavorite);
    localStorage.setItem("favoriteSongs", JSON.stringify(favoriteSongs));
    console.log(favoriteSongs);
  }
  

  return (
    <nav className="relative z-50 flex items-center justify-between h-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 border-b border-black/10">
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="flex items-center space-x-2 text-black/80 hover:text-black transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Go Back</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Image
            src="/favicon.png"
            alt="SGCC Logo Icon"
            width={20}
            height={20}
            className="inline-block mr-8"
          />
          <div className="text-black font-semibold text-sm md:text-lg tracking-wide">
            SGCC Collection of Songs
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleClick}
          className={`p-2 rounded-full border transition-all duration-200 ${
            isFavorite
              ? "border-[#722b41] bg-[#722b41]/20 text-[#722b41]"
              : "border-black/20 text-black/60 hover:border-black/40 hover:text-black/80"
          }`}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
    </nav>
  );
}
