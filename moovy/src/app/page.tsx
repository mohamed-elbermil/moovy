import ContentCarousel from "../components/ContentCarousel/ContentCarousel";
import FollowUsBar from "../components/FollowUsBar/FollowUsBar";
import CategorieList from "../components/CategorieList/CategorieList"
import Footer from "../components/Footer/Footer"
import "../styles/base.css";
import genreMap from "../data/genreMap";

export default async function Home() {
  const API_KEY = process.env.TMDB_API_KEY;
  console.log("API_KEY =", API_KEY);

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr&sort_by=popularity.desc`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Erreur fetch TMDb :", res.status);
    return <main>Erreur lors du chargement des films</main>;
  }

  const data = await res.json();

  const getMoviesByGenreNames = (genreNames: string[]) => {
    const genreIds = genreNames.map(
      (name) =>
        Number(Object.keys(genreMap).find((id) => genreMap[id] === name))
    );

    return data.results.filter((movie) =>
      movie.genre_ids.some((id) => genreIds.includes(id))
    );
  };

  // Liste complète des sections à afficher dans l'ordre
  const sections = [
    {
      type: "carousel",
      names: ["Action"],
      title: "Action Non-Stop",
      subtitle: "Les sensations fortes à couper le souffle",
    },
    {
      type: "followUs",
    },    
    {
      type:"list",
    },
    {
      type: "carousel",
      names: ["Horreur", "Thriller"],
      title: "Frissons & Suspense",
      subtitle: "Entre peur et adrénaline",
    },



    {
      type: "carousel",
      names: ["Fantastique", "Comédie"],
      title: "Comédie & Univers Mystérieux",
      subtitle: "Des mondes imaginaires qui vous captivent",
    },
  ];

  return (
    <main>
      {sections.map((section, index) => {
        if (section.type === "carousel") {
          return (
            <ContentCarousel
              key={index}
              movies={getMoviesByGenreNames(section.names)}
              title={section.title}
              subtitle={section.subtitle}
            />
          );
        }
        if (section.type === "followUs") {
          return <FollowUsBar key={index} />;
        }

        if(section.type  === "list") {
          return (
          <CategorieList
           key={index} 
           title="Parcours nos catégories"
           subtitle="Nos catégories"
           movies={data.results}
           />
          )
        }

        return null;
      })}
    <Footer/>
    </main>
  );
}
