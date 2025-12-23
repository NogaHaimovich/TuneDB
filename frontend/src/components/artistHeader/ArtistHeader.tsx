
import type { SimplifiedArtist } from "../../types";

export interface ArtistHeaderProps {
    artist: SimplifiedArtist | null;
}

const ArtistHeader = ({
    artist,
}: ArtistHeaderProps) => {
  return (
        <>
            <img
                className="artist_page_image"
                src={artist?.picture || artist?.image || ""}
                alt={artist?.name || "Artist"} />
            <h2 className="artist_page_title">{artist?.name}</h2>
        </>
        
        
  );
};

export default ArtistHeader;
