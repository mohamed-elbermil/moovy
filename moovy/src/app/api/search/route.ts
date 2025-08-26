import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "TMDB_API_KEY manquante côté serveur" },
      { status: 500 }
    );
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr&include_adult=false&query=${encodeURIComponent(
    query
  )}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Erreur TMDb: ${res.status}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({ results: Array.isArray(data.results) ? data.results : [] });
  } catch (error) {
    return NextResponse.json({ error: "Erreur de réseau" }, { status: 500 });
  }
}


