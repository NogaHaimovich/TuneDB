import { Link, useParams } from "react-router-dom";

import "./styles.scss";
import type { SimplifiedRecord } from "../../types/music";
import useData from "../../hooks/useData";
import AddToPlaylistButton from "../../components/AddToPlaylistButton";

const RecordPage = () => {
    const { id: record_id } = useParams<{ id: string }>();

    const { data, loading, error } = useData(
        record_id ? `/deezer/record?id=${encodeURIComponent(record_id)}` : ""
    );

    const record: SimplifiedRecord | null = data
        ? {
            id: data.id,
            title: data.title,
            preview: data.preview,
            duration: data.duration,
            releaseDate: data.release_date ?? "Unknown",
            artistName: data.artist?.name ?? "Unknown Artist",
            artistLink: data.artist?.link ?? "#",
            artistPicture: data.artist?.picture ?? "",
            albumTitle: data.album?.title ?? "Unknown Album",
            albumLink: data.album?.link ?? "#",
            albumCover: data.album?.cover ?? "",
            artistId: data.artist?.id ?? ""
        }
        : null;
    

    if (!record_id) return <p>No record ID provided.</p>;
    if (loading) return <p>Loading record...</p>;
    if (error) return <p>Error loading record: {error}</p>;
    if (!loading && !record) return <p>No data found for this record.</p>;

    return (
    <div className="record_page">
        <img
        className="record_page_album_cover"
        src={record?.albumCover}
        alt={record?.albumTitle}
        />
        <h2 className="record_page_title">{record?.title}</h2>
        <AddToPlaylistButton 
          trackId={record?.id.toString() || ""}
          title={record?.title}
          artist={record?.artistName}
          album={record?.albumTitle}
          image={record?.albumCover}
        />
        <audio controls src={record?.preview}></audio> 
        <div className="record_page_main">

        <div className="record_page_info">
            <p className="record_page_data">
            Artist: <Link to={`/artist/${record?.artistId}`}>{record?.artistName}</Link>
            </p>
            <p className="record_page_data">
            Album: {record?.albumTitle}
            </p>
            
            <p className="record_page_data">Duration: {record?.duration} sec</p>
            <p className="record_page_data">Release Date: {record?.releaseDate}</p>
            
        </div>
        <Link to={`/artist/${record?.artistId}`} className="record_page_artist-data">
            <img
            className="record_page_artist-data_image"
            src={record?.artistPicture}
            alt={record?.artistName}
            />
        </Link>
        </div>
    </div>
    );
}

export default RecordPage;
