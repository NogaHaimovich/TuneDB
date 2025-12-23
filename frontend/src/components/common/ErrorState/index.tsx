import React from "react";
import "./styles.scss";
import Button from "../Button";
import type { ErrorStateProps } from "../../../types/components";

const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  description = "Please try again or come back later.",
  onRetry,
  retryLabel = "Retry",
  actions,
  icon,
  className = "",
  children,
}) => {
  const containerClassName = ["error-state", className].filter(Boolean).join(" ");

  const handleRetry = () => {
    if (onRetry) {
      void onRetry();
    }
  };

  return (
    <section className={containerClassName} role="alert">
      {icon && <div className="error-state__icon" aria-hidden="true">{icon}</div>}

      <div className="error-state__content">
        {title && <h2 className="error-state__title">{title}</h2>}
        {description && <p className="error-state__description">{description}</p>}
        {children}
      </div>

      {(onRetry || actions) && (
        <div className="error-state__actions">
          {onRetry && (
            <Button type="button" variant="primary" onClick={handleRetry}>
              {retryLabel}
            </Button>
          )}
          {actions}
        </div>
      )}
    </section>
  );
};

export default ErrorState;

