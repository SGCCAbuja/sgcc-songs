"use client";

import { useEffect, useState } from "react";

const FAVORITES_KEY = "favoriteSongs";

export function useFavorites() {
  const [favoriteSongs, setFavoriteSongs] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);

      if (stored) {
        setFavoriteSongs(JSON.parse(stored));
      }
    } catch {
      setFavoriteSongs([]);
    }
  }, []);

  const toggleFavorite = (songId: number) => {
    setFavoriteSongs((current) => {
      const next = current.includes(songId)
        ? current.filter((id) => id !== songId)
        : [...current, songId];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));

      return next;
    });
  };

  const checkFavorite = (songId: number) => favoriteSongs.includes(songId);

  return {
    favoriteSongs,
    checkFavorite,
    toggleFavorite,
  };
}
