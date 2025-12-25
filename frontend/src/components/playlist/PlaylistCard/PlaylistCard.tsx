import type { PlaylistCardProps } from "./types";
import { Link } from "react-router-dom";

import "./styles.scss"
import Button from "../../common/Button/Button";
import Card from "../../common/Card/Card";

const PlaylistCard = ({playlist, onEdit, onDelete, onViewMore}: PlaylistCardProps) =>{
    const visibleTracks = playlist.tracks.slice(0, 5);
    const playlistId = playlist.id || "";
    return (
        <div key={playlistId} className="playlist_card">
        <div className="playlist_header">
            <div className="playlist_title_row">
            <Link
                to={`/playlist/${playlistId}`}
                className="playlist_name"
            >
                {playlist.name}
            </Link>

            <button
                className="edit_playlist_btn"
                title="Edit playlist name"
                onClick={() => onEdit?.(playlistId, playlist.name)}
            >
                🖊️
            </button>
            </div>
            <span className="track_count">{playlist.tracks.length} tracks</span>
        </div>

        {playlist.tracks.length === 0 ? (
            <p>No tracks</p>
        ) : (
            <>
            <ul className="tracks_list">
                {visibleTracks.map((t) => (
                <li key={t.trackId} className="track_item">
                    <Card
                    title={t.title}
                    image={t.image}
                    id={t.trackId}
                    type="record"
                    />
                </li>
                ))}
            </ul>

            <div className="buttons_line">
                {playlist.tracks.length > 5 && (
                <Button
                    variant="primary"
                    className="see_more_btn"
                    onClick={() => onViewMore?.(playlistId)}
                >
                    See More
                </Button>
                )}

                <Button
                variant="danger"
                className="delete_playlist_btn"
                onClick={() => onDelete?.(playlistId, playlist.name)}
                >
                Delete Playlist
                </Button>
            </div>
            </>
        )}
        </div>
    );
}

export default PlaylistCard