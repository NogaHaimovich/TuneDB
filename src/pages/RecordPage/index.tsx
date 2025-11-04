import { Link, useParams } from "react-router-dom";

import "./styles.scss";
import RecordHeader from "../../components/record/RecordHeader";
import RecordInfo from "../../components/record/RecordInfo";
import useRecordData from "../../hooks/useRecordData";

const RecordPage = () => {
    const { id: record_id } = useParams<{ id: string }>();
    const { record, loading, error } = useRecordData(record_id);
    
    if (!record_id) return <p>No record ID provided.</p>;
    if (loading) return <p>Loading record...</p>;
    if (error) return <p>Error loading record: {error}</p>;
    if (!loading && !record) return <p>No data found for this record.</p>;

    return (
        <div className="record_page">
            <RecordHeader record={record} />
            <div className="record_page_main">
                <RecordInfo record={record} />
                <Link to={`/artist/${record?.artistId}`} className="record_page_artist-data">
                    <img
                        className="artist_image"
                        src={record?.artistPicture || ""}
                        alt={record?.artistName || "Artist"}
                    />
                </Link>
            </div>
        </div>
    );
}

export default RecordPage;
