
import "./styles.scss";
import type { ArtistHeaderProps } from "./types";


const ArtistHeader = ({
    artist,
}: ArtistHeaderProps) => {
  return (
        <>
            <img
                className="artist_page_image"
                src={artist?.image}
                alt={artist?.name} />
            <h2 className="artist_page_title">{artist?.name}</h2>
        </>
        
        
  );
};

export default ArtistHeader;
