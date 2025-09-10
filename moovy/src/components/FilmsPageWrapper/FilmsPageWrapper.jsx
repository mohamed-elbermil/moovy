"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";

export default function FilmsPageWrapper({ moviesData }) {
  const { user, addWatchedMovie } = useAuth();

  const handleMovieClick = (movie) => {
    if (user) {
      addWatchedMovie({
        movieId: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date
      });
    }
  };

  return (
    <main>
      {moviesData.map((section, index) => (
        <ContentCarousel
          key={index}
          movies={section.movies}
          title={section.title}
          subtitle={section.subtitle}
          onMovieClick={handleMovieClick}
        />
      ))}
    </main>
  );
}
