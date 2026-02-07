 "use client";
 import { useEffect, useState } from "react";
 import styles from "./HashedTrailer.module.css";
 
 export default function HashedTrailer({ id, mediaType }) {
   const [videoKey, setVideoKey] = useState(null);
   const [loading, setLoading] = useState(false);
 
   useEffect(() => {
     let active = true;
     const load = async () => {
       try {
         setLoading(true);
         const q = mediaType === "tv" ? "?type=tv" : "";
         const res = await fetch(`/api/movies/${id}/videos${q}`, { cache: "no-store" });
         if (!res.ok) {
           setVideoKey(null);
           return;
         }
         const data = await res.json();
         const key = (data?.trailers?.[0]?.key) || null;
         if (active) setVideoKey(key);
       } finally {
         setLoading(false);
       }
     };
     if (id) load();
     return () => { active = false; };
   }, [id, mediaType]);
 
   return (
     <div className={styles.hero} aria-label="Bande-annonce en en-tête">
       {videoKey ? (
         <>
           <iframe
             className={styles.iframe}
             src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&playlist=${videoKey}&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
             title="Trailer"
             allow="autoplay; encrypted-media"
             loading="lazy"
           />
           <div className={styles.overlay} />
         </>
       ) : (
         <div className={styles.placeholder}>
           {loading ? "Chargement du trailer..." : "Aucun trailer disponible"}
         </div>
       )}
     </div>
   );
 }
