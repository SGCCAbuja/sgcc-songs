"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, Music, Filter, ArrowRight } from "lucide-react";
import { Montserrat } from "next/font/google";
import { hymns } from "@/data/hymns";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

type Hymn = {
  id: number;
  title: string;
  authors: string[];
  year?: number;
  verses: {
    type: string;
    number: number;
    content: string;
  }[];
  note?: string;
};

export default function HymnCollectionPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  const authors = ["all", ...new Set(hymns.flatMap((hymn) => hymn.authors))];

  const filteredHymns = useMemo(() => {
    return hymns.filter((hymn: Hymn) => {
      const matchesSearch =
        searchQuery === "" ||
        hymn.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hymn.authors.some((author) =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesAuthor =
        selectedAuthor === "all" || hymn.authors.includes(selectedAuthor);

      return matchesSearch && matchesAuthor;
    });
  }, [searchQuery, selectedAuthor]);

  return (
    <div
      className={`min-h-screen bg-[#121212] relative ${montserrat.className}`}
    >
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
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="SGCC Logo"
            width={150}
            height={150}
            className="inline-block mr-2"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-4">
          <Link
            href="https://sgcc.ng"
            className="text-white text-sm tracking-wide relative hover:text-white/90 active:text-white/70 transition-colors duration-200"
          >
            Church&apos;s Website
            <div className="absolute -bottom-1 left-0 w-full h-px bg-[#7E040C]"></div>
          </Link>
          <Link
            href="#"
            className="text-white/80 hover:text-white active:text-white/60 text-sm tracking-wide transition-colors duration-200"
          >
            Join us Live
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-1 hover:text-white/80 active:text-white/60 hover:bg-white/5 active:bg-white/10 rounded transition-all duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#121212] border-b border-white/10 p-4 z-40">
          <div className="flex flex-col space-y-4">
            <Link
              href="#"
              className="text-white text-sm tracking-wide relative hover:text-white/90 active:text-white/70 transition-colors duration-200"
            >
              Church&apos;s Website
              <div className="absolute -bottom-1 left-0 w-full h-px bg-[#7E040C]"></div>
            </Link>
            <Link
              href="#"
              className="text-white/80 hover:text-white active:text-white/60 text-sm tracking-wide transition-colors duration-200"
            >
              Join us Live
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex">
        {/* Song List */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-white font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2">
                SGCC Collection of Songs
              </h1>
              <p className="text-[#C7C7C7] text-sm sm:text-base">
                Browse or search through the collection of hymns.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter the hymn number, title, or author name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/60 text-sm focus:outline-none focus:border-[#7E040C] focus:bg-white/15 transition-all duration-200"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
              />
            </div>

            <div className="block w-full p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold text-sm mb-3 flex items-center">
                    <Filter size={16} className="mr-2 text-[#7E040C]" />
                    Filters (by Authors)
                  </h3>

                  <div className="space-y-4">
                    <select
                      value={selectedAuthor}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-[#7E040C] focus:bg-white/15 transition-all duration-200"
                    >
                      {authors.map((author) => (
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
                </div>

                <div className="pt-4">
                  <div className="text-white/60 text-sm">
                    {filteredHymns.length} hymn
                    {filteredHymns.length !== 1 ? "s" : ""} found
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-4"></div>

            {/* Song Cards */}
            <div className="grid gap-4 sm:gap-6">
              {filteredHymns.map((hymn) => (
                <div
                  key={hymn.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <Link href={`/hymn/${hymn.id}`}>
                        <p className="text-white/80 text-sm">Hymn {hymn.id}</p>
                        <div className="flex items-center space-x-3 mb-2">
                          <Music size={16} className="text-[#7E040C]" />
                          <h3 className="text-white font-semibold text-lg group-hover:text-[#7E040C] transition-colors duration-200">
                            {hymn.title}
                          </h3>
                        </div>

                        <div className="space-y-1 mb-3">
                          <p className="text-white/80 text-sm">
                            by {hymn.authors.join(", ")}{" "}
                            <span>&copy; {hymn.year}</span>
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:ml-6">
                      <Link
                        href={`/hymn/${hymn.id}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-[#7E040C] text-[#ffffff] font-semibold text-sm rounded-full hover:bg-[#C7884A] active:bg-[#8B5E33] transition-all duration-200"
                      >
                        <span>View Lyrics</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHymns.length === 0 && (
              <div className="text-center py-12">
                <Music size={48} className="text-white/30 mx-auto mb-4" />
                <h3 className="text-white/60 text-lg mb-2">No hymns found</h3>
                <p className="text-white/40 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
