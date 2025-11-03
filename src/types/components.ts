
export type CardType = "artist" | "record" | "album";

export interface CardProps {
  title?: string;
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
