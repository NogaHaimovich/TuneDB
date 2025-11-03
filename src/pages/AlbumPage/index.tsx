import "./styles.scss";
import { useParams } from "react-router-dom";
import useAlbumData from "../../hooks/useAlbumData";
import AlbumHeader from "../../components/AlbumHeader";
import AlbumTracksList from "../../components/AlbumTracksList";

const AlbumPage = () => {
  const { id: album_id } = useParams<{ id: string }>();

  const { album, loading, error } = useAlbumData(album_id)

  if (!album_id) return <p>No album ID provided.</p>;
  if (loading) return <p>Loading album...</p>;
  if (error) return <p>Error loading album: {error}</p>;
  if (!loading && !album) return <p>No data found for this album.</p>;

  return (
    <div className="album_page">
      <AlbumHeader
        album={album}
      />
      <AlbumTracksList
        album={album}
      />
    </div>
  );
};

export default AlbumPage;
