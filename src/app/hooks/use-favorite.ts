"use client";

import { useEffect, useState } from "react";

const FAVORITES_KEY = "favoriteSongs";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);

      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = (songId: number) => {
    setFavorites((current) => {
      const next = current.includes(songId)
        ? current.filter((id) => id !== songId)
        : [...current, songId];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));

      return next;
    });
  };

  const checkFavorite = (songId: number) => favorites.includes(songId);

  return {
    favorites,
    checkFavorite,
    toggleFavorite,
  };
}
