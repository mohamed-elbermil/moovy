import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import genreMap from "@/data/genreMap";

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function getGenreIdFromSlug(slug: string): number | null {
  const entry = Object.entries(genreMap).find(([, label]) => slugify(label as string) === slug);
  if (!entry) return null;
  return Number(entry[0]);
}

export default async function CategoryPage(context: { params: Promise<{ slug: string }> }) {
  const API_KEY = process.env.TMDB_API_KEY;
  const { slug } = await context.params;
  const genreId = getGenreIdFromSlug(slug);

  if (!genreId) {
    return <main>Catégorie inconnue</main>;
  }

  const [resMovies, resTv] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr&with_genres=${genreId}&sort_by=popularity.desc`, { cache: "no-store" }),
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=fr&with_genres=${genreId}&sort_by=popularity.desc`, { cache: "no-store" })
  ]);

  if (!resMovies.ok && !resTv.ok) {
    return <main>Erreur lors du chargement des contenus</main>;
  }

  const [moviesData, tvData] = await Promise.all([
    resMovies.ok ? resMovies.json() : Promise.resolve({ results: [] }),
    resTv.ok ? resTv.json() : Promise.resolve({ results: [] })
  ]);

  const tvWithType = (tvData.results || []).map((t: unknown) => ({ ...(t as Record<string, unknown>), media_type: 'tv' }));
  const merged = [
    ...(moviesData.results || []),
    ...tvWithType
  ];
  const label = (genreMap as Record<string, string>)[String(genreId)];

  return (
    <main>
      <ContentCarousel
        movies={merged}
        title={label}
        subtitle={`Films et séries de ${label}`}
      />
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = Object.values(genreMap).map((name) => ({ slug: slugify(name) }));
  return slugs;
}


