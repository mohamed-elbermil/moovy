import "../styles/reset.css";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
