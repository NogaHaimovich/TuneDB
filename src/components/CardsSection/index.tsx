import Card, { SkeletonCard } from "../Card";
import "./styles.scss";
import { useState, useEffect } from "react";
import type { CardSectionProps } from "../../types/components";

const CardSection = ({
  title,
  cardCount = 5,
  cards = [],
  loading = false,
}: CardSectionProps) => {
  const [showError, setShowError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowError(false);
      setHasLoaded(false);
    } else if (hasLoaded || (cards && cards.length > 0)) {
      setHasLoaded(true);
      setShowError(false);
    } else if (!loading && !hasLoaded) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, cards, hasLoaded]);

  return (
    <div className="card-section">
      <h1 className="card-section__title">{title}</h1>
      <div className="card-section__row">
        {loading ? (
          Array.from({ length: cardCount }).map((_, idx) => (
            <SkeletonCard key={`skeleton-${idx}`} />
          ))
        ) : cards && cards.length > 0 ? (
          cards.slice(0, cardCount).map((card, idx) => (
            <Card
              key={card.id || `fallback-${idx}`}
              title={card.title}
              image={card.image}
              id={card.id}
              type={card.type}
            />
          ))
        ) : showError ? (
          <div className="card-section__error">
            <p>Oops something is missing here</p>
          </div>
        ) : (
          Array.from({ length: cardCount }).map((_, idx) => (
            <SkeletonCard key={`transition-${idx}`} />
          ))
        )}
      </div>
    </div>
  );
};

export default CardSection;
