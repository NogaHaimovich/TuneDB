import type { CardProps } from "../../types/components";

export interface UseHomePageDataReturn  {
    topSongsCards:CardProps[],
    topArtistsCards: CardProps[],
    newSongsCards: CardProps[],
    topSongsLoading: boolean,
    topArtistsLoading: boolean,
    newSongsLoading: boolean
}