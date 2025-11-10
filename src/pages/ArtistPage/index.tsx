import { useParams } from "react-router-dom";
import "./styles.scss";
import { useMemo } from "react";
import Card from "../../components/common/Card";
import ArtistHeader from "../../components/artist/ArtistHeader";
import useArtistData from "../../hooks/useArtistData";
import ErrorState from "../../components/common/ErrorState";
import LoadingState from "../../components/common/LoadingState";
import SkeletonCard from "../../components/common/Card/SkeletonCard";

const ArtistPage = () => {
  const { id: artist_id } = useParams<{ id: string }>();

  const { artist, loading, error, refetch } = useArtistData(artist_id);

  const skeletons = useMemo(
    () => (
      <div className="artist_page__skeleton">
        <div className="artist_page__skeleton-header">
          <div className="artist_page__skeleton-image" />
          <div className="artist_page__skeleton-details">
            <div className="artist_page__skeleton-line artist_page__skeleton-line--title" />
            <div className="artist_page__skeleton-line" />
            <div className="artist_page__skeleton-line artist_page__skeleton-line--short" />
          </div>
        </div>
        <div className="artist_page__skeleton-grid">
          {Array.from({ length: 10 }, (_, index) => (
            <SkeletonCard key={`artist-song-skeleton-${index}`} />
          ))}
        </div>
      </div>
    ),
    []
  );
  

  if (!artist_id) return <p>No artist ID provided.</p>;
  if (loading) {
    return (
      <div className="artist_page artist_page--state">
        <LoadingState
          title="Loading artist profile"
          description="Hang tight while we load artist info and top songs."
          skeletons={skeletons}
          fullHeight
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="artist_page artist_page--state">
        <ErrorState
          title="We couldn't load this artist."
          description={error}
          onRetry={refetch}
          retryLabel="Try again"
        />
      </div>
    );
  }

  if (!artist) return <p>No data found for this artist.</p>;

  return (
    <div className="artist_page">
        <ArtistHeader
          artist={artist}
        />
        
        <h3>-Songs-</h3>
        {artist.songs && artist.songs.length > 0 && (
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
