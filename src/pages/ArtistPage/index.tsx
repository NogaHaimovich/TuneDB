import { useParams } from "react-router-dom";
import "./styles.scss";
import useData from "../../hooks/useData";
import Card from "../../components/common/Card";
import type { SimplifiedArtist } from "../../types/music";

const ArtistPage = () => {
  const { id: artist_id } = useParams<{ id: string }>();

  const { data, loading, error } = useData<SimplifiedArtist>(
    artist_id ? `/deezer/artist?id=${encodeURIComponent(artist_id)}` : ""
  );

  if (!artist_id) return <p>No artist ID provided.</p>;
  if (loading) return <p>Loading artist...</p>;
  if (error) return <p>Error loading artist: {error}</p>;
  if (!loading && !data) return <p>No data found for this artist.</p>;

  const artist = data;

  return (
    <div className="artist_page">
        <img
            className="artist_page_image"
            src={artist?.image}
            alt={artist?.name}
        />
        <h2 className="artist_page_title">{artist?.name}</h2>
        
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
