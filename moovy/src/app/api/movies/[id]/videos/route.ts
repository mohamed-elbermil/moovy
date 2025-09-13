import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const movieId = params.id;
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

  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=fr`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Erreur TMDb: ${res.status}` },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    
    // Filtrer pour ne garder que les vidéos YouTube de type "Trailer"
    const trailers = data.results?.filter((video: any) => 
      video.site === "YouTube" && 
      video.type === "Trailer" &&
      video.official === true
    ) || [];

    // Trier par popularité (plus de likes = plus populaire)
    trailers.sort((a: any, b: any) => (b.like_count || 0) - (a.like_count || 0));

    return NextResponse.json({ 
      trailers: trailers.slice(0, 1), // Retourner seulement le meilleur trailer
      allVideos: data.results || []
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos:", error);
    return NextResponse.json(
      { error: "Erreur de réseau" }, 
      { status: 500 }
    );
  }
}
