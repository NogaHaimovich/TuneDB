import "./styles.scss";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useAlbumData from "../../hooks/useAlbumData";
import AlbumHeader from "../../components/album/AlbumHeader/AlbumHeader";
import AlbumTracksList from "../../components/album/AlbumTracksList/AlbumTracksList";
import LoadingState from "../../components/common/LoadingState/LoadingState";
import ErrorState from "../../components/common/ErrorState/ErrorState";

const AlbumPage = () => {
  const { id: album_id } = useParams<{ id: string }>();

  const { album, loading, error, refetch } = useAlbumData(album_id);

  const skeletons = useMemo(
    () => (
      <div className="album_page__skeleton">
        <div className="album_page__skeleton-header">
          <div className="album_page__skeleton-cover" />
          <div className="album_page__skeleton-details">
            <div className="album_page__skeleton-line album_page__skeleton-line--title" />
            <div className="album_page__skeleton-line" />
            <div className="album_page__skeleton-line album_page__skeleton-line--short" />
          </div>
        </div>
        <div className="album_page__skeleton-tracks">
          {Array.from({ length: 6 }, (_, index) => (
            <div className="album_page__skeleton-line album_page__skeleton-line--track" key={`album-track-skeleton-${index}`} />
          ))}
        </div>
      </div>
    ),
    []
  );

  if (!album_id) return <p>No album ID provided.</p>;

  if (loading) {
    return (
      <div className="album_page album_page--state">
        <LoadingState
          title="Loading album details"
          description="Hang tight while we load the album and tracks."
          skeletons={skeletons}
          fullHeight
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="album_page album_page--state">
        <ErrorState
          title="We couldn't load this album."
          description={error}
          onRetry={refetch}
          retryLabel="Try again"
        />
      </div>
    );
  }

  if (!loading && !album) return <p>No data found for this album.</p>;

  return (
    <div className="album_page">
      <AlbumHeader album={album} />
      <AlbumTracksList album={album} />
    </div>
  );
};

export default AlbumPage;
