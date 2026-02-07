// Helpers d'application pour gérer film/série et URL trailer
export const buildTrailerApiUrl = (id: number, mediaType?: "movie" | "tv") => {
  const q = mediaType === "tv" ? "?type=tv" : "";
  return `/api/movies/${id}/videos${q}`;
};

export type MediaFlags = { media_type?: "movie" | "tv"; name?: string; title?: string };

export const mediaTypeFromFlags = (item: MediaFlags): "movie" | "tv" => {
  const isTv = item?.media_type === "tv" || (!!item?.name && !item?.title);
  return isTv ? "tv" : "movie";
};
