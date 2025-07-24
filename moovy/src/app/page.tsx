import { access } from "fs";
import ContentCarousel from "../components/ContentCarousel/ContentCarousel";

export default async function Home() {
  const API_KEY = process.env.TMDB_API_KEY;
  console.log("API_KEY =", API_KEY);
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr&sort_by=popularity.desc`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    console.error("Erreur fetch TMDb :", res.status);
    return <main>Erreur lors du chargement des films</main>;
  }

  const data = await res.json();

  return (
    <main>
      <ContentCarousel movies={data.results || []} />
    </main>
  );
}
