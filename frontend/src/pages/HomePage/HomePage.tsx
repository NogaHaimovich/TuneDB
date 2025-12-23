import HeroSection from "./heroSection/HeroSection";
import CardSection from "../../components/common/CardsSection/CardsSection";
import "./styles.scss";
import useHomePageData from "../../hooks/useHomePageData";




const HomePage = () => {
  
  const { topSongsCards, topArtistsCards, newSongsCards, topSongsLoading, topArtistsLoading, newSongsLoading } = useHomePageData();
  return (
    <div className="home-page">
      <HeroSection />
     <CardSection
      title="- Top Tunes -"
      cards={topSongsCards}
      loading={topSongsLoading}
    />

    <CardSection
      title="- Top Artists -"
      cards={topArtistsCards}
      loading={topArtistsLoading}
    />

    <CardSection
      title="- Fresh Tunes -"
      cards={newSongsCards}
      loading={newSongsLoading}
    />

    </div>
  );
};

export default HomePage;
