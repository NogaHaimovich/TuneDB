import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import "./styles.scss";
import RecordHeader from "../../components/record/RecordHeader";
import RecordInfo from "../../components/record/RecordInfo";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import useRecordData from "../../hooks/useRecordData";

const RecordPage = () => {
    const { id: record_id } = useParams<{ id: string }>();
    const { record, loading, error, refetch } = useRecordData(record_id);

    const skeletons = useMemo(
        () => (
            <div className="record_page__skeleton">
                <div className="record_page__skeleton-header">
                    <div className="record_page__skeleton-cover" />
                    <div className="record_page__skeleton-details">
                        <div className="record_page__skeleton-line record_page__skeleton-line--title" />
                        <div className="record_page__skeleton-line" />
                        <div className="record_page__skeleton-line record_page__skeleton-line--short" />
                        <div className="record_page__skeleton-audio" />
                    </div>
                </div>
                <div className="record_page__skeleton-info">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div
                            className="record_page__skeleton-line record_page__skeleton-line--info"
                            key={`record-info-skeleton-${index}`}
                        />
                    ))}
                </div>
            </div>
        ),
        []
    );

    if (!record_id) return <p>No record ID provided.</p>;

    if (loading) {
        return (
            <div className="record_page record_page--state">
                <LoadingState
                    title="Loading record details"
                    description="Hang tight while we load record information."
                    skeletons={skeletons}
                    fullHeight
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="record_page record_page--state">
                <ErrorState
                    title="We couldn't load this record."
                    description={error}
                    onRetry={refetch}
                    retryLabel="Try again"
                />
            </div>
        );
    }

    if (!record) return <p>No data found for this record.</p>;

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
