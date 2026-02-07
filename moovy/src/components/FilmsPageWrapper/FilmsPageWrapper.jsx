"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import HashedTrailer from "@/components/HeaderTrailer/HashedTrailer";

export default function FilmsPageWrapper({ moviesData }) {
  const { user, addWatchedMovie } = useAuth();

  const handleMovieClick = (movie) => {
    if (user) {
      addWatchedMovie({
        movieId: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        release_date: movie.release_date
      });
    }
  };

  return (
    <main>
      {Array.isArray(moviesData) && moviesData.length > 0 && moviesData[0].movies?.length > 0 && (() => {
        const first = moviesData[0].movies[0];
        const isSerie = first?.media_type === 'tv' || (!!first?.name && !first?.title);
        const mediaType = isSerie ? 'tv' : 'movie';
        return <HashedTrailer id={first.id} mediaType={mediaType} />;
      })()}
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
