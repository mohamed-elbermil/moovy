import { access } from "fs";
import ContentCarousel from "../components/ContentCarousel/ContentCarousel";
import FollowUsBar from "../components/FollowUsBar/FollowUsBar"
import "../styles/variables.css"
import "../styles/base.css"
import genreMap from "../data/genreMap"



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
  const actionGenreId = 28; 
  const horrorGenreId = 27;   
  const fantasticGenreId = 14;  
  
  // Filtrer les films action et horreur
  const actionMovies = data.results.filter(movie => movie.genre_ids.includes(actionGenreId));
  const horrorMovies = data.results.filter(movie => movie.genre_ids.includes(horrorGenreId));
  const fantasticMovies = data.results.filter(movie => movie.genre_ids.includes(fantasticGenreId));

  return (
    <main>
      <ContentCarousel 
        movies={actionMovies} 
        title="Action Non-Stop" 
        subtitle="Les sensations fortes à couper le souffle"
      />

      <FollowUsBar />

      <ContentCarousel 
        movies={horrorMovies} 
        title="Frissons & Terreur" 
        subtitle="Osez plonger dans l’horreur ultime"
      />

      <ContentCarousel 
        movies={fantasticMovies}
        title="Univers Fantastiques" 
        subtitle="Des mondes imaginaires qui vous captivent"
      />
    </main>
  );
}
