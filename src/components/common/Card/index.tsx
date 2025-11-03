import "./styles.scss";
import SkeletonCard from "./SkeletonCard";
import { Link } from "react-router-dom";
import type { CardProps, CardType } from "../../../types/components";

export type { CardType, CardProps };

const Card = ({ title, image, id, type }: CardProps) => {
  const linkPath = `/${type}/${id}`;

  return (
    <Link to={linkPath} className="card">
      <img className="card__image" src={image} alt={title} />
      <h1 className="card__title">{title}</h1>
    </Link>
  );
};

export default Card;
export { SkeletonCard };
