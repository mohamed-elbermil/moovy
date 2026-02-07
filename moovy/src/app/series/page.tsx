import FilmsPageWrapper from "@/components/FilmsPageWrapper/FilmsPageWrapper";

type TvItem = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  genre_ids: number[];
  media_type?: "tv";
};

export default async function SeriesPage() {
  const API_KEY = process.env.TMDB_API_KEY;

  const [popularRes, topRatedRes, airingTodayRes, onTheAirRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=fr`, { cache: "no-store" }),
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=fr`, { cache: "no-store" }),
    fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=fr`, { cache: "no-store" }),
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=fr`, { cache: "no-store" }),
  ]);

  if (!popularRes.ok || !topRatedRes.ok || !airingTodayRes.ok || !onTheAirRes.ok) {
    return <main>Erreur lors du chargement des séries</main>;
  }

  const [popular, topRated, airingToday, onTheAir] = await Promise.all([
    popularRes.json(),
    topRatedRes.json(),
    airingTodayRes.json(),
    onTheAirRes.json(),
  ]);

  const tagTv = (arr: unknown[]): TvItem[] =>
    (Array.isArray(arr) ? arr : []).map((t) => ({ ...(t as TvItem), media_type: "tv" }));

  const moviesData = [
    {
      movies: tagTv(popular.results) as TvItem[],
      title: "Séries Populaires",
      subtitle: "Tendances du moment",
    },
    {
      movies: tagTv(topRated.results) as TvItem[],
      title: "Mieux notées",
      subtitle: "Les favorites du public",
    },
    {
      movies: tagTv(airingToday.results) as TvItem[],
      title: "Diffusées aujourd'hui",
      subtitle: "À ne pas manquer",
    },
    {
      movies: tagTv(onTheAir.results) as TvItem[],
      title: "En cours de diffusion",
      subtitle: "Épisodes récents",
    },
  ];

  return <FilmsPageWrapper moviesData={moviesData} />;
}
