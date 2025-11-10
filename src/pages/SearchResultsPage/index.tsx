import { useMemo } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss";
import Card from "../../components/common/Card";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import SkeletonCard from "../../components/common/Card/SkeletonCard";
import useSearchResults from "../../hooks/useSearchResults";

const SearchResultsPage = () => {
  const { query } = useParams<{ query: string }>();

  const { tracks, loading, error, refetch } = useSearchResults(query);

  const skeletons = useMemo(
    () => (
      <div className="results_grid results_grid--skeleton">
        {Array.from({ length: 6 }, (_, index) => (
          <SkeletonCard key={`search-skeleton-${index}`} />
        ))}
      </div>
    ),
    []
  );

  if (!query) {
    return <p>No search query provided.</p>;
  }

  if (loading) {
    return (
      <div className="results_page_container">
        <LoadingState
          title={`Searching for "${query}"`}
          description="Hang tight while we gather matching tracks."
          skeletons={skeletons}
          fullHeight
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="results_page_container">
        <ErrorState
          title="We couldn't load your search results."
          description={error}
          onRetry={refetch}
          retryLabel="Try again"
        />
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="results_page_container">
        <ErrorState
          title="No results found"
          description={`We couldn't find any tracks matching "${query}".`}
        />
      </div>
    );
  }

  return (
    <div className="results_page_container">
      <h2 className="results_page_title">Search results for: {query}</h2>
      <div className="results_grid">
        {tracks.map((track) => (
          <Card
            key={track.id}
            title={track.title}
            subTitle={track.artist}
            type="record"
            image={track.albumCover}
            id={String(track.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
