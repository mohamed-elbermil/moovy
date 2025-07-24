import ContentCarousel from "../components/ContentCarousel/ContentCarousel"

const moviesItems = [
  {title:'Stranger things', imageUrl:'https://static.posters.cz/image/1300/129581.jpg', description: 'lorem ipsum dolor rvevevee', style:"Série"}
]

export default function Home() {
  return (
    <main>
      <ContentCarousel items={moviesItems} />
    </main>
  );
}
