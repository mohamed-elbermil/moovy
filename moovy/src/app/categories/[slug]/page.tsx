import ContentCarousel from "@/components/ContentCarousel/ContentCarousel";
import genreMap from "@/data/genreMap";
import Link from "next/link";
import BannerTrailer from "@/components/BannerTrailer/BannerTrailer";
import styles from "./page.module.css";

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

type TMDbItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  overview?: string;
  vote_average?: number;
  genre_ids?: number[];
  media_type?: "movie" | "tv";
};

export default async function CategoryPage(context: { params: Promise<{ slug: string }> }) {
  const API_KEY = process.env.TMDB_API_KEY;
  const { slug } = await context.params;
  const genreId = getGenreIdFromSlug(slug);

  if (!genreId) {
    return <main>Catégorie inconnue</main>;
  }

  const [resMovies, resTv, resTopRated] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr&with_genres=${genreId}&sort_by=popularity.desc`,
      { cache: "no-store" }
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=fr&with_genres=${genreId}&sort_by=popularity.desc`,
      { cache: "no-store" }
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr&with_genres=${genreId}&sort_by=vote_average.desc&vote_count.gte=200`,
      { cache: "no-store" }
    ),
  ]);

  const [moviesData, tvData, topRatedData] = await Promise.all([
    resMovies.ok ? resMovies.json() : Promise.resolve({ results: [] }),
    resTv.ok ? resTv.json() : Promise.resolve({ results: [] }),
    resTopRated.ok ? resTopRated.json() : Promise.resolve({ results: [] }),
  ]);

  const tvWithType: TMDbItem[] = (tvData.results || []).map((t: unknown) => ({
    ...(t as Record<string, unknown>),
    media_type: "tv",
  })) as TMDbItem[];
  const merged: TMDbItem[] = [
    ...((moviesData.results || []) as TMDbItem[]),
    ...tvWithType,
  ];
  const label = (genreMap as Record<string, string>)[String(genreId)];
  const moviesCount = (moviesData.results || []).length;
  const tvCount = tvWithType.length;
  const totalCount = merged.length;
  const candidate = merged.find((i) => !!i.id) as TMDbItem | undefined;
  const suggestions = Object.values(genreMap)
    .filter((name) => name !== label)
    .slice(0, 8)
    .map((name) => ({
      name,
      slug: slugify(name as string),
    }));

  return (
    <main>
      {candidate ? (
        <BannerTrailer
          id={candidate.id}
          type={candidate.media_type === "tv" || (!!candidate.name && !candidate.title) ? "tv" : "movie"}
          label={label}
          backdrop={candidate.backdrop_path ?? null}
        />
      ) : null}

      <section className={styles.categoryHeader}>
        <div className="title-container">
          <span className="subtitle">Catégorie</span>
          <h2 className="title-section">{label}</h2>
        </div>
        <div className={styles.stats}>
          <span className={styles.stat}>Total: {totalCount}</span>
          <span className={styles.stat}>Films: {moviesCount}</span>
          <span className={styles.stat}>Séries: {tvCount}</span>
        </div>
      </section>

      <ContentCarousel
        movies={merged as TMDbItem[]}
        title={label}
        subtitle={`Films et séries de ${label}`}
      />

      <ContentCarousel
        movies={(topRatedData.results || []) as TMDbItem[]}
        title="Mieux notés"
        subtitle={`Sélection ${label}`}
      />

      <ContentCarousel
        movies={(merged as TMDbItem[]).filter((i) => !!i.poster_path).slice(0, 16)}
        title={`Sélection dans ${label}`}
        subtitle="À découvrir"
      />

      <section style={{ margin: "2em 0" }}>
        <div className="title-container">
          <span className="subtitle">Suggestions</span>
          <h2 className="title-section">Catégories voisines</h2>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {suggestions.map((s) => (
            <Link
              key={s.slug}
              href={`/categories/${s.slug}`}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "1px solid #c3b5db55",
                color: "#c3b5db",
                fontSize: 14,
              }}
            >
              {s.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = Object.values(genreMap).map((name) => ({ slug: slugify(name) }));
  return slugs;
}


