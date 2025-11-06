import { useParams } from "react-router-dom";
import "./styles.scss";
import Card from "../../components/common/Card";
import useSearchResults from "../../hooks/useSearchResults";

const SearchResultsPage = () => {
  const { query } = useParams<{ query: string }>();

  const { tracks, loading, error } = useSearchResults(query)

  if (!query) return <p>No search query provided.</p>;
  if (loading) return <p>Loading results...</p>;
  if (error) return <p>Error loading results: {error}</p>;
  if (!loading && tracks.length === 0)
    return (
      <div className="results_page_container">
        <p>No results found for "{query}"</p>
      </div>
    );

  return (
    <div className="results_page_container">
      <h2 className="results_page_title">Search results for: {query}</h2>
      <div className="results_grid">
        {tracks.map((track) => (
          <Card
            title={track.title}
            subTitle={track.artist}
            type="record"
            image={track.albumCover}
            id = {String(track.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
