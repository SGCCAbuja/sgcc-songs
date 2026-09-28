"use client";

import { useMemo, useState } from "react";
import { Search, Music, Heart } from "lucide-react";
import { useFavorites } from "@/app/hooks/use-favorite";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import SongCard from "@/app/components/songCard";

import songs from "@/app/data/songs.json";
import { SongType } from "@/app/types/song";

export default function SongCollectionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [showFavorite, setShowFavorite] = useState(false);

  const { favoriteSongs } = useFavorites();

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

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-2">
              {/* Search Bar */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-5 -translate-y-1/2 text-black/60"
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
              <div>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-4 py-2 bg-black/5 border border-black/20 rounded-bl-full text-black text-md focus:outline-none focus:border-[#722b41] transition-all duration-200"
                >
                  <option value="all">Filter (by author name)</option>

                  {[...authors].sort().map((author) => (
                    <option
                      key={author}
                      value={author}
                      className="bg-[#121212]"
                    >
                      {author === "all" ? "All Authors" : author}
                    </option>
                  ))}
                </select>

                {selectedAuthor !== "all" && (
                  <div className="mt-2 text-black/60 text-sm text-right">
                    Showing {filteredSongs.length} song
                    {filteredSongs.length !== 1 ? "s" : ""} by:{" "}
                    <span className="font-bold">{selectedAuthor}</span>.
                  </div>
                )}
              </div>

              {/* Favorites */}
              <div className="flex items-start justify-end md:justify-start">
                <button
                  type="button"
                  onClick={() => setShowFavorite((prev) => !prev)}
                  className={`p-2 rounded-full border transition-all duration-200 ${
                    showFavorite
                      ? "border-[#722b41] bg-[#722b41]/20 text-[#722b41]"
                      : "border-black/20 text-black/60 hover:border-black/40 hover:text-black/80"
                  }`}
                  aria-label="Show favorite songs"
                  aria-pressed={showFavorite}
                >
                  <Heart
                    size={16}
                    fill={showFavorite ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>

            <div className="border-t border-white/10 p-4"></div>

            {/* Song Cards */}
            <div className="grid gap-4 sm:gap-6">
              {filteredSongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>

            {/* Empty State */}
            {filteredSongs.length === 0 &&
              !(showFavorite && favoriteSongs.length === 0) && (
                <div className="text-center py-12">
                  <Music size={48} className="text-black/30 mx-auto mb-4" />

                  <h3 className="text-black/80 text-lg mb-2">
                    No songs found.
                  </h3>

                  <p className="text-black/40 text-sm">
                    Try adjusting your search or filters...
                  </p>
                </div>
              )}

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
