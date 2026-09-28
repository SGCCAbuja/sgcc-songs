"use client";

import { use, useMemo } from "react";
import { Music } from "lucide-react";
import Header from "@/app/components/headerHome";
import Footer from "@/app/components/footer";
import SongCard from "@/app/components/songCard";

import songs from "@/app/data/songs.json";
import playlists from "@/app/data/playlist.json";
import { SongType } from "@/app/types/song";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function PlaylistPage({ params }: Props) {
  const { id } = use(params);

  // Find the playlist from the URL
  const selectedPlaylist = playlists.find((playlist) => playlist.id === id);

  // Playlist song IDs
  const playlistSongIds = useMemo(
    () => selectedPlaylist?.songIds ?? [],
    [selectedPlaylist]
  );

  // Only songs that belong to this playlist
  const playlistSongs = useMemo(() => {
    return songs.filter((song: SongType) => playlistSongIds.includes(song.id));
  }, [playlistSongIds]);

  // Playlist doesn't exist
  if (!selectedPlaylist) {
    return (
      <div className="min-h-screen relative">
        <Header />

        <div className="flex">
          <div className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-12">
                <Music size={48} className="text-black/30 mx-auto mb-4" />

                <h1 className="text-black text-2xl font-semibold mb-2">
                  Playlist not found.
                </h1>

                <p className="text-black/40 text-sm">
                  The playlist you are looking for does not exist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <Header />

      {/* Main Content */}
      <div className="flex">
        {/* Song List */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Playlist Header */}
            <div className="mb-8">
              <h1 className="text-black font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-2">
                {selectedPlaylist.name}
              </h1>

              <p className="text-black/70 text-sm md:text-lg">
                Explore{" "}
                <span className="font-bold">{playlistSongs.length}</span> songs
                in this playlist.
              </p>
            </div>

            <div className="border-t border-white/10 p-4"></div>

            {/* Song Cards */}
            <div className="grid gap-4 sm:gap-6">
              {playlistSongs.map((song: SongType) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>

            {/* Empty State */}
            {playlistSongs.length === 0 && (
              <div className="text-center py-12">
                <Music size={48} className="text-black/30 mx-auto mb-4" />

                <h3 className="text-black/80 text-lg mb-2">No songs found.</h3>

                <p className="text-black/40 text-sm">
                  This playlist does not contain any songs.
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
