 "use client";
 import { useEffect, useState } from "react";
 import Image from "next/image";
 import styles from "./BannerTrailer.module.css";
 
 type Props = {
   id: number;
   type: "movie" | "tv";
   label: string;
   backdrop: string | null;
 };
 
 export default function BannerTrailer({ id, type, label, backdrop }: Props) {
   const [key, setKey] = useState<string | null>(null);
 
   useEffect(() => {
     let aborted = false;
     (async () => {
       try {
         const res = await fetch(`/api/movies/${id}/videos?type=${type}`, { cache: "no-store" });
         if (!res.ok) return;
         const data = (await res.json()) as {
           trailers?: Array<{ site?: string; key?: string }>;
           allVideos?: Array<{ site?: string; type?: string; key?: string }>;
         };
         const primary = Array.isArray(data?.trailers)
           ? data.trailers.find((v) => v?.site === "YouTube" && v?.key)
           : undefined;
         const fallback = Array.isArray(data?.allVideos)
           ? data.allVideos.find((v) => v?.site === "YouTube" && v?.type === "Trailer")
           : undefined;
         const found = (primary?.key ?? fallback?.key) as string | undefined;
         if (!aborted) setKey(found ?? null);
       } catch {
         if (!aborted) setKey(null);
       }
     })();
     return () => {
       aborted = true;
     };
   }, [id, type]);
 
   if (key) {
     return (
      <section className={styles.section}>
        <div className={styles.ratio}>
          <iframe className={styles.frame}
             src={`https://www.youtube.com/embed/${key}?rel=0&controls=0&autoplay=1&mute=1&modestbranding=1&playsinline=1&loop=1&playlist=${key}`}
             title={`Trailer ${label}`}
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
             loading="lazy"
             referrerPolicy="no-referrer-when-downgrade"
           />
         </div>
       </section>
     );
   }
 
   if (backdrop) {
     return (
      <section className={styles.section}>
        <div className={styles.imageWrap}>
           <Image
             src={`https://image.tmdb.org/t/p/w1280${backdrop}`}
             alt={label}
             fill
             style={{ objectFit: "cover" }}
             priority
           />
         </div>
       </section>
     );
   }
 
   return null;
 }
