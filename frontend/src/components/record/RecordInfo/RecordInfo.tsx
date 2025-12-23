import { Link } from "react-router-dom";
import "./styles.scss"
import type { RecordInfoProps } from "./types";

const RecordInfo = ({ record }: RecordInfoProps) => {
    if (!record) return null;

    return (
        <div className="record_info">
            <div className="record_page_info">
                <p className="record_page_data">
                    Artist: <Link to={`/artist/${record.artistId}`}>{record.artistName}</Link>
                </p>
                {record.albumTitle && (
                    <p className="record_page_data">
                        Album: {record.albumTitle}
                    </p>
                )}
                {record.duration && (
                    <p className="record_page_data">
                        Duration: {Math.floor(record.duration / 60)}:{(record.duration % 60).toString().padStart(2, '0')}
                    </p>
                )}
                {record.releaseDate && (
                    <p className="record_page_data">
                        Release Date: {record.releaseDate}
                    </p>
                )}
            </div>
        </div>
    );
};

export default RecordInfo;