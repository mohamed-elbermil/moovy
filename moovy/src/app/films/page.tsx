import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  genre_ids: number[];
};

export default async function FilmsPage() {
  const API_KEY = process.env.TMDB_API_KEY;

  const [popularRes, topRatedRes, upcomingRes, nowPlayingRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr`, { cache: "no-store" }),
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=fr`, { cache: "no-store" }),
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=fr`, { cache: "no-store" }),
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=fr`, { cache: "no-store" }),
  ]);

  if (!popularRes.ok || !topRatedRes.ok || !upcomingRes.ok || !nowPlayingRes.ok) {
    return <main>Erreur lors du chargement des films</main>;
  }

  const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
    popularRes.json(),
    topRatedRes.json(),
    upcomingRes.json(),
    nowPlayingRes.json(),
  ]);

  return (
    <main>
      <ContentCarousel
        movies={popular.results as Movie[]}
        title="Films Populaires"
        subtitle="Tendances du moment"
      />
      <ContentCarousel
        movies={topRated.results as Movie[]}
        title="Mieux notés"
        subtitle="Les favoris du public"
      />
      <ContentCarousel
        movies={upcoming.results as Movie[]}
        title="À venir"
        subtitle="Ne les manquez pas bientôt"
      />
      <ContentCarousel
        movies={nowPlaying.results as Movie[]}
        title="En salles"
        subtitle="Actuellement au cinéma"
      />
    </main>
  );
}
