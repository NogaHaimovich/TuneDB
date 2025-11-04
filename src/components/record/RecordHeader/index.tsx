import AddToPlaylistButton from "../../playlist/AddToPlaylistButton";
import type { RecordHeaderProps } from "./types";
import "./styles.scss"

const RecordHeader = ({ record }: RecordHeaderProps) => {
    if (!record) return null;

    return (
        <div className="record_header">
            <img
                className="record_page_album_cover"
                src={record.albumCover || ""}
                alt={record.albumTitle || "Album cover"}
            />
            <h2 className="record_page_title">{record.title}</h2>
            <AddToPlaylistButton
                trackId={record.id.toString()}
                title={record.title}
                artist={record.artistName}
                album={record.albumTitle}
                image={record.albumCover}
            />
            {record.preview && (
                <audio controls src={record.preview}>
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default RecordHeader;