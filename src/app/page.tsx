"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/headerHome";
import { Search, Music, ArrowRight } from "lucide-react";

import songs from "@/app/data/songs.json";
import { SongType } from "@/app/types/song";
import { Heart } from "lucide-react";

export default function SongCollectionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [showFavorite, setShowFavorite] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favoriteSongs");
    if (stored) {
      setFavoriteSongs(JSON.parse(stored));
    }
  }, []);
  
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("favoriteSongs");
      setFavoriteSongs(stored ? JSON.parse(stored) : []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const authors = ["all", ...new Set(songs.flatMap((song) => song.authors))];

  const filteredSongs = useMemo(() => {
    
    return songs.filter((song: SongType) => {
      const matchesSearch =
        searchQuery === "" ||
        song.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.authors.some((author) =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesAuthor =
        selectedAuthor === "all" || song.authors.includes(selectedAuthor);

      const matchesFavorite = !showFavorite || favoriteSongs.includes(song.id);

      return matchesSearch && matchesAuthor && matchesFavorite;
    });
  }, [searchQuery, selectedAuthor, showFavorite, favoriteSongs]);

  

  return (
    <div className="min-h-screen relative">
      <Header />

      {/* Main Content */}
      <div className="flex">
        {/* Song List */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-black font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2">
                SGCC Collection of Songs
              </h1>
              <p className="text-black/70 text-sm md:text-lg">
                Explore the collection of{" "}
                <span className="font-bold">{songs.length}</span> songs and
                hymns from{" "}
                <span className="font-bold">
                  Sovereign Grace Community Church, Abuja
                </span>
                .
              </p>
            </div>

            <div className="border-t border-black/10 p-4"></div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-0">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-5 transform -translate-y-1/2 text-black/60 md:top-1/2"
                />
                <input
                  type="text"
                  placeholder="Enter the song number, title, or author name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full px-4 py-2 pl-10 bg-black/5 border border-black/20 rounded-tr-full text-black text-md focus:outline-none focus:border-[#722b41] transition-all duration-200"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="w-full md:w-1/3">
                <div className="space-y-2">
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full px-4 py-2 bg-black/5 border border-black/20 rounded-bl-full text-black text-md focus:outline-none focus:border-[#722b41] transition-all duration-200"
                  >
                    <option value="all" disabled>
                      Filter (by author name)
                    </option>
                    {authors.sort().map((author) => (
                      <option
                        key={author}
                        value={author}
                        className="bg-[#121212]"
                      >
                        {author === "all" ? "All Authors" : author}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedAuthor !== "all" && (
                  <div className="mt-2 text-black/60 text-sm">
                    Showing {filteredSongs.length} song
                    {filteredSongs.length !== 1 ? "s" : ""} by:{" "}
                    <span className="font-bold">{selectedAuthor}</span>.
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowFavorite((prev) => !prev)}
              className={`p-2 rounded-full border transition-all duration-200 ${
                showFavorite
                  ? "border-[#722b41] bg-[#722b41]/20 text-[#722b41]"
                  : "border-black/20 text-black/60 hover:border-black/40 hover:text-black/80"
              }`}
            >
              <Heart size={16} fill={showFavorite ? "currentColor" : "none"} />
        </button>
         
            <div className="border-t border-white/10 p-4"></div>

            {showFavorite && favoriteSongs.length === 0 && (
              <div className="text-center py-12">
                <Music size={48} className="text-black/30 mx-auto mb-4" />
                <h3 className="text-black/80 text-lg mb-2">No favorite songs yet.</h3>
              </div>
            )}

            {/* Song Cards */}
            <div className="grid gap-4 sm:gap-6">
              {filteredSongs.map((song) => (
                <div
                  key={song.id}
                  className="bg-[#722b41]/10 border border-black/10 rounded-xl p-4 sm:p-6 hover:border-white/20 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <Link href={`/song/${song.id}`}>
                        <div className="text-[#722b41] flex items-center space-x-2 mb-2">
                          <Music size={16} />
                          <p className="text-2xl font-bold">{song.id}</p>
                        </div>
                        <div className="mb-2">
                          <h3 className="text-black font-semibold text-lg group-hover: transition-colors duration-200">
                            {song.title}
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
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-[#722b41] text-[#ffffff] font-semibold text-sm rounded-full transition-all duration-200"
                      >
                        <span>View Lyrics</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSongs.length === 0 && !(
              showFavorite && favoriteSongs.length === 0
            ) && (
              <div className="text-center py-12">
                <Music size={48} className="text-black/30 mx-auto mb-4" />
                <h3 className="text-black/80 text-lg mb-2">No songs found.</h3>
                <p className="text-black/40 text-sm">
                  Try adjusting your search or filters...
                </p>
              </div>
            )}

            <div>
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
        </div>
      </div>
    </div>
  );
}
