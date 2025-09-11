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

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const API_KEY = process.env.TMDB_API_KEY;
  const genreId = getGenreIdFromSlug(params.slug);

  if (!genreId) {
    return <main>Catégorie inconnue</main>;
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr&with_genres=${genreId}&sort_by=popularity.desc`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <main>Erreur lors du chargement des films</main>;
  }

  const data = await res.json();
  const label = (genreMap as Record<string, string>)[String(genreId)];

  return (
    <main>
      <ContentCarousel
        movies={data.results}
        title={label}
        subtitle={`Films de ${label}`}
      />
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = Object.values(genreMap).map((name) => ({ slug: slugify(name) }));
  return slugs;
}


