"use client";

import "../styles/reset.css";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import Loader from "@/components/Loader/Loader"; // chemin correct

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
          integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Navbar />
            {pathname === "/" && <Header />}
            {children}
          </>
        )}
      </body>
    </html>
  );
}
