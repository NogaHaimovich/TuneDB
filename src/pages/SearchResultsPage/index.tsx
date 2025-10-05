import { Link, useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import "./styles.scss";
import type { SimplifiedTrack } from "../../types/music";

const SearchResultsPage = () => {
  const { query } = useParams<{ query: string }>();

  const { data, loading, error } = useData(
    query ? `/search?q=${encodeURIComponent(query)}` : ""
  );

  const tracks: SimplifiedTrack[] = data?.data?.map((track: any) => ({
    id: track.id,
    title: track.title_short,
    artist: track.artist?.name ?? "Unknown Artist",
    albumCover: track.album?.cover_medium ?? "",
  })) || [];

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
        <Link to={`/record/${track.id}`} className="results_card" key={track.id}>
            <img
              className="results_card_image"
              src={track.albumCover}
              alt={track.title}
            />
            <p className="results_card_title">{track.title}</p>
            <p className="results_card_artist">{track.artist}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
