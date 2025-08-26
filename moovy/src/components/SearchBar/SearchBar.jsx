'use client'

import { useEffect, useState } from "react";

export default function FilmsPage() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (query === "") {
            setMovies([]);
            return;
        }

        const fetchMovies = async () => {
            setLoading(true);
            try{
                const res = await fetch(`url`)
                const data = await res.json()
                setMovies(data.results)
            } catch (error) {
                console.log(error);                
            } finally {
                setLoading(false)
            }
        };

        fetchMovies();       
    }, [query]);

    return(
        <div>
            <h1>film</h1>
            <input
                type="text"
                placeholder="Rechercher un film..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded p-2 w-full"
            />
            {loading && <p>Chargement...</p>}
            <ul>
                {movies.map((movie: any) => (
                <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    )
}