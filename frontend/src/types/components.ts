
import type React from "react";

export type CardType = "artist" | "record" | "album";

export interface CardProps {
  title?: string;
  subTitle?: string,
  image?: string;
  id?: string;
  type: CardType;
}

export interface CardSectionProps {
  title: string;
  cardCount?: number;
  cards?: CardProps[];
  loading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger"; 
}

export interface ThreadsProps {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
}

export interface LoadingStateProps {
  title?: string;
  description?: string;
  skeletons?: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
}

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void | Promise<void>;
  retryLabel?: string;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}
