import "./styles.scss";
import { Link } from "react-router-dom";
import type { AlbumHeaderProps } from "./types";

const AlbumHeader = ({
    album,
}: AlbumHeaderProps) => {
  if (!album) return null;

  return (
    <div className="album_header">
      <img 
        src={album.cover || album.image || ""} 
        alt={album.title}
        className="album_header_image"
      />
      <h2 className="album_header_title">{album.title}</h2>
      <div className="album_header_details">
        <Link to={`/artist/${album.artist.id}`}>
          Artist: {album.artist.name}
        </Link>
        {album.releaseDate && (
          <h3>Release date: {album.releaseDate}</h3>
        )}
      </div>
    </div>
  );
};

export default AlbumHeader;
