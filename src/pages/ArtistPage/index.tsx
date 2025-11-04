import { useParams } from "react-router-dom";
import "./styles.scss";
import Card from "../../components/common/Card";
import ArtistHeader from "../../components/artist/ArtistHeader";
import useArtistData from "../../hooks/useArtistData";

const ArtistPage = () => {
  const { id: artist_id } = useParams<{ id: string }>();

  const { artist, loading, error } = useArtistData(artist_id)

  if (!artist_id) return <p>No artist ID provided.</p>;
  if (loading) return <p>Loading artist...</p>;
  if (error) return <p>Error loading artist: {error}</p>;
  if (!loading && !artist) return <p>No data found for this artist.</p>;


  return (
    <div className="artist_page">
        <ArtistHeader
          artist={artist}
        />
        
        <h3>-Songs-</h3>
        {artist?.songs && artist.songs.length > 0 && (
            <div className="artist_songs_grid">
            {artist.songs.map((song) => (
                <Card
                key={song.id}
                id={String(song.id)}
                title={song.title}
                image={song.image}
                type="record"
                />
            ))}
            </div>
        )}
    </div>
  );
};

export default ArtistPage;
