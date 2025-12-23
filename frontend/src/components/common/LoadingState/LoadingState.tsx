import React from "react";
import "./styles.scss";
import type { LoadingStateProps } from "../../../types/components";

const LoadingState: React.FC<LoadingStateProps> = ({
  title = "Loading…",
  description,
  skeletons,
  className = "",
  fullHeight = false,
  children,
}) => {
  const containerClassName = [
    "loading-state",
    fullHeight ? "loading-state--full-height" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasSkeletons = Boolean(skeletons);

  return (
    <section className={containerClassName} aria-busy="true" aria-live="polite">
      {hasSkeletons ? (
        <div className="loading-state__skeletons">{skeletons}</div>
      ) : (
        <div className="loading-state__spinner" role="status" aria-label={title}>
          <span className="loading-state__sr-only">Loading</span>
        </div>
      )}

      {(title || description || children) && (
        <div className="loading-state__content">
          {title && <h2 className="loading-state__title">{title}</h2>}
          {description && <p className="loading-state__description">{description}</p>}
          {children}
        </div>
      )}
    </section>
  );
};

export default LoadingState;

