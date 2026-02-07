// Types TMDB communs pour films/séries/vidéos
export interface TMDbItemBase {
  id: number;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
}

export interface TMDbMovie extends TMDbItemBase {
  title?: string;
  media_type?: "movie";
}

export interface TMDbTv extends TMDbItemBase {
  name?: string;
  media_type?: "tv";
}

export type TMDbItem = TMDbMovie | TMDbTv;

export interface TMDbVideo {
  site: string;
  type: string;
  official?: boolean;
  like_count?: number;
  key?: string;
}

// Gardiens de type et utilitaires simples
export const isTv = (item: TMDbItem | unknown): item is TMDbTv => {
  const m = item as TMDbTv;
  return m?.media_type === "tv" || (!!m?.name && !("title" in (m as TMDbMovie)));
};

export const getDisplayTitle = (item: TMDbItem): string => {
  return (item as TMDbMovie).title || (item as TMDbTv).name || "Sans titre";
};
