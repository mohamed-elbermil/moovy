import { NextRequest, NextResponse } from "next/server";

interface VideoResult {
  site: string;
  type: string;
  official?: boolean;
  like_count?: number;
  key?: string;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: movieId } = await context.params;
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "TMDB_API_KEY manquante côté serveur" },
      { status: 500 }
    );
  }

  if (!movieId) {
    return NextResponse.json(
      { error: "ID du film manquant" },
      { status: 400 }
    );
  }

  const typeParam = new URL(request.url).searchParams.get("type");
  const path = typeParam === "tv" ? "tv" : "movie";
  const url = `https://api.themoviedb.org/3/${path}/${movieId}/videos?api_key=${apiKey}&language=fr`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Erreur TMDb: ${res.status}` },
        { status: res.status }
      );
    }
    
    const data = (await res.json()) as { results?: VideoResult[] };
    
    // Filtrer pour ne garder que les vidéos YouTube de type "Trailer"
    const trailers = (data.results ?? []).filter((video: VideoResult) => 
      video.site === "YouTube" && 
      video.type === "Trailer" &&
      video.official === true
    );

    // Trier par popularité (plus de likes = plus populaire)
    trailers.sort(
      (a: VideoResult, b: VideoResult) => (b.like_count ?? 0) - (a.like_count ?? 0)
    );

    return NextResponse.json({ 
      trailers: trailers.slice(0, 1),
      allVideos: data.results ?? []
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos:", error);
    return NextResponse.json(
      { error: "Erreur de réseau" }, 
      { status: 500 }
    );
  }
}
