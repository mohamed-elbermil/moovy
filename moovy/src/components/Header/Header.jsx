"use client";

import Btn from '../Button/Button';
import CNC from "../CNC/CNC";
import styles from "./Header.module.css";
import { useEffect, useState } from 'react';

const useSerieData = (tvId) => {
  const [serieData, setSerieData] = useState(null);
  const [rating, setRating] = useState("—");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSerieData = async () => {
      try {
        // 1Récupération des infos principales en français
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvId}?api_key=659ebb575947822b54330a69ba2a1f3f&language=fr-FR`
        );
        if (!response.ok) throw new Error("Erreur réseau");
        const data = await response.json();

        let titleFR = data.name;
        let overviewFR = data.overview;

        // Si la description est vide, on récupère les traductions
        if (!overviewFR || overviewFR.trim() === "") {
          const translationsResp = await fetch(
            `https://api.themoviedb.org/3/tv/${tvId}/translations?api_key=659ebb575947822b54330a69ba2a1f3f`
          );
          const translationsData = await translationsResp.json();
          const fr = translationsData.translations.find(t => t.iso_3166_1 === "FR");
          if (fr && fr.data) {
            titleFR = fr.data.name || titleFR;
            overviewFR = fr.data.overview || overviewFR;
          }
        }

        setSerieData({ ...data, titleFR, overviewFR });

        // Récupération de la classification d’âge
        const ratingResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${tvId}/content_ratings?api_key=659ebb575947822b54330a69ba2a1f3f`
        );
        const ratingData = await ratingResponse.json();

        let frRating = ratingData.results.find(r => r.iso_3166_1 === "FR");
        if (!frRating) {
          frRating = ratingData.results.find(r => r.iso_3166_1 === "US");
        }

        setRating(frRating ? frRating.rating : "—");

      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSerieData();
  }, [tvId]);

  return { serieData, rating, loading };
};

const Header = () => {
  const tvId = 153312; // Tulsa King
  const { serieData, rating, loading } = useSerieData(tvId);

  if (loading) return <div>Chargement...</div>;
  if (!serieData) return <div>Impossible de récupérer les données de la série.</div>;

  const title = serieData.titleFR || serieData.name;
  const description = serieData.overviewFR || "Aucune description disponible";
  const genres = serieData.genres?.map(g => g.name).join(' · ') || "N/A";
  const runtime = serieData.episode_run_time?.[0] ? `${serieData.episode_run_time[0]} min` : "N/A";

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.categorieList}>
          <CNC className={styles.cnc}>+{rating}</CNC>
          <p className={styles.infos}>{genres}</p>
          <p className={styles.infos}>{runtime}</p>
        </div>
        <p className={styles.description}>{description}</p>
        <Btn variant="play" href="https://www.youtube.com/watch?v=goTO1rR_FWQ&ab_channel=Paramount%2BFrance" target="_blank">Lecture</Btn>
      </div>

      <div className={styles.shadowsBanner}>dddddddd</div>
      {serieData.backdrop_path && (
        <div
          className={styles.banner}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${serieData.backdrop_path})`,
          }}
          role="img"
          aria-label={title}
        ></div>
      )}
    </header>
  );
};

export default Header;
