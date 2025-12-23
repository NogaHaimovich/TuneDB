import { useMemo } from "react";
import "./styles.scss";
import PlaylistGrid from "../../components/playlist/PlaylistGrid/PlaylistGrid";
import EditPlaylistNamePopup from "../../components/playlist/EditPlaylistNamePopup/EditPlaylistNamePopup";
import usePlaylistManager from "../../hooks/usePlaylistManager";
import LoadingState from "../../components/common/LoadingState/LoadingState";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import SkeletonCard from "../../components/common/Card/SkeletonCard";

const PlaylistsListPage = () => {
  const {
    playlists,
    loading,
    error,
    isEditPopupOpen,
    newPlaylistName,
    popupError,
    handleEdit,
    handleDelete,
    handleViewMore,
    handleNameChange,
    handleCloseEditPopup,
    handleSaveEdit,
    refreshPlaylists,
  } = usePlaylistManager();

  const skeletons = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => <SkeletonCard key={`playlist-grid-skeleton-${index}`} />),
    []
  );

  if (loading) {
    return (
      <div className="playlists_page playlists_page--state">
        <LoadingState
          title="Loading playlists"
          description="Hang tight while we load your playlists."
          skeletons={skeletons}
          fullHeight
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="playlists_page playlists_page--state">
        <ErrorState
          title="We couldn't load your playlists."
          description={error}
          onRetry={refreshPlaylists}
          retryLabel="Try again"
        />
      </div>
    );
  }

  return (
    <div className="playlists_page">
      <h1>My Playlists</h1>

      <PlaylistGrid
        playlists={playlists}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewMore={handleViewMore}
        emptyMessage="No playlists yet."
        showActions={true}
      />

      <EditPlaylistNamePopup
        isOpen={isEditPopupOpen}
        initialName={newPlaylistName}
        error={popupError}
        onChange={handleNameChange}
        onClose={handleCloseEditPopup}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default PlaylistsListPage;
