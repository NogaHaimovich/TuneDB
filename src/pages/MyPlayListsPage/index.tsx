import "./styles.scss";
import PlaylistGrid from "../../components/PlaylistGrid";
import EditPlaylistNamePopup from "../../components/EditPlaylistNamePopup";
import usePlaylistManager from "../../hooks/usePlaylistManager/index";

const MyPlaylistsPage = () => {
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
  } = usePlaylistManager();

  return (
    <div className="playlists_page">
      <h1>My Playlists</h1>

      <PlaylistGrid
        playlists={playlists}
        loading={loading}
        error={error || undefined}
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

export default MyPlaylistsPage;