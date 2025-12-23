import { useMemo, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss";
import Card from "../../components/common/Card";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import SkeletonCard from "../../components/common/Card/SkeletonCard";
import useSearchResults from "../../hooks/useSearchResults";

const SearchResultsPage = () => {
  const { query } = useParams<{ query: string }>();

  const {
    tracks,
    loading,
    loadingMore,
    error,
    refetch,
    hasMore,
    loadMore,
    total,
  } = useSearchResults(query);

  const hasResults = tracks.length > 0;
  const totalResults = total ?? tracks.length;

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

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loadingMore, loadMore]);


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

  if (error && !hasResults) {
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

  if (!loading && !hasResults) {
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
      <p className="results_page_summary">
        Showing {tracks.length} {tracks.length === 1 ? "result" : "results"}
        {totalResults > tracks.length ? ` of ${totalResults}` : ""}.
      </p>
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

      {error && hasResults && (
        <div className="results_page_message results_page_message--error">
          <p>Something went wrong while loading additional results.</p>
        </div>
      )}

      {hasMore && (
        <div className="results_page_pagination">
          <div
            ref={observerRef}
            className="infinite-scroll-trigger"
          />
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
