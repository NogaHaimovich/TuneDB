import HeroSection from "./heroSection";
import CardSection from "../../components/CardsSection";
import useData from "../../hooks/useData";
import "./styles.scss";
import type { Song, Artist, TopSongsResponse, TopArtistsResponse, NewSongsResponse } from "../../types/music";
import type { CardProps } from "../../components/Card";



const HomePage = () => {
  const { data: topSongsData, loading: topSongsLoading } = useData<TopSongsResponse>("/deezer/topRatedSongs?limit=5");
  const { data: topArtistsData, loading: topArtistsLoading } = useData<TopArtistsResponse>("/deezer/topRatedArtists?limit=5");
  const { data: newSongsData, loading: newSongsLoading } = useData<NewSongsResponse>("/deezer/newSongs?limit=5");

  const topSongsCards: CardProps[] = topSongsData?.tracks?.map((song: Song) => ({
    title: song.songName,
    image: song.image,
    id: song.track_id,
    type: "record" as const
  })) || [];

  const topArtistsCards: CardProps[] = topArtistsData?.tracks?.map((artist: Artist) => ({
    title: artist.artistName,
    image: artist.image,
    id: artist.artist_id,
    type: "artist" as const
  })) || [];

  const newSongsCards: CardProps[] = newSongsData?.tracks?.map((song: Song) => ({
    title: song.songName,
    image: song.image,
    id: song.track_id,
    type: "album" as const
  })) || [];

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
