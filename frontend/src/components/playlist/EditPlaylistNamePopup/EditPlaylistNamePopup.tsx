import type { EditPlaylistNamePopupProps } from "./types";
import "./styles.scss"
import Button from "../../common/Button/Button";

const EditPlaylistNamePopup = ({ isOpen, initialName, error, onChange, onClose, onSave}: EditPlaylistNamePopupProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="popup_overlay" onClick={onClose}>
      <div className="popup_box" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Playlist Name</h2>
        <input
          type="text"
          value={initialName}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter new playlist name"
          className="popup_input"
        />
        {error && <p className="popup_error">{error}</p>}
        <div className="popup_buttons">
          <Button variant="primary" onClick={onSave}>Save</Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default EditPlaylistNamePopup;