import { useMemo } from "react";
import "./styles.scss";
import PlaylistDetailsHeader from "../../components/playlist/PlaylistDetailsHeader";
import PlaylistDetailTracksGrid from "../../components/playlist/PlaylistDetailTracksGrid";
import usePlaylistDetails from "../../hooks/usePlaylistDetails";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import SkeletonCard from "../../components/common/Card/SkeletonCard";

const PlaylistDetailPage = () => {
  const { playlist, loading, error, refresh } = usePlaylistDetails();

  const skeletons = useMemo(
    () => (
      <div className="playlist_page__skeleton">
        <div className="playlist_page__skeleton-header">
          <div className="playlist_page__skeleton-line playlist_page__skeleton-line--title" />
          <div className="playlist_page__skeleton-line playlist_page__skeleton-line--subtitle" />
        </div>
        <div className="playlist_page__skeleton-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <SkeletonCard key={`playlist-detail-skeleton-${index}`} />
          ))}
        </div>
      </div>
    ),
    []
  );

  if (loading) {
    return (
      <div className="playlist_page playlist_page--state">
        <LoadingState
          title="Loading playlist"
          description="Hang tight while we load playlist details."
          skeletons={skeletons}
          fullHeight
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="playlist_page playlist_page--state">
        <ErrorState
          title="We couldn't load this playlist."
          description={error}
          onRetry={refresh}
          retryLabel="Try again"
        />
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="playlist_page playlist_page--state">
        <ErrorState
          title="Playlist not found"
          description="The playlist you're looking for doesn't seem to exist."
        />
      </div>
    );
  }

  return (
    <div className="playlist_page">
      <PlaylistDetailsHeader name={playlist.name} tracksCount={playlist.tracks.length} />

      {playlist.tracks.length === 0 ? (
        <p>No tracks in this playlist</p>
      ) : (
        <PlaylistDetailTracksGrid playlist={playlist} />
      )}
    </div>
  );
};

export default PlaylistDetailPage;
