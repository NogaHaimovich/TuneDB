import type { PlaylistDetailsHeaderProps } from "./types"
import "./styles.scss";
import "./styles.scss"

const PlaylistDetailsHeader = ({name, tracksCount}: PlaylistDetailsHeaderProps) => {
return (
    <div className="playlist_header">
        <h1 className="playlist_name">{name}</h1>
        <span className="track_count">{tracksCount} tracks</span>
    </div>
)}

export default PlaylistDetailsHeader