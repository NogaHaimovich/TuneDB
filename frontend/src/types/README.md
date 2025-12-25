# Type Organization

This directory contains all TypeScript interfaces and types for the TuneDB project, organized by category for better maintainability and discoverability.

## Structure

### `index.ts`
Main export file that re-exports all types. Import from here for convenience:
```typescript
import { Song, UserPayload, CardProps } from '../types';
```

### `music.ts`
Music-related interfaces and types:
- `Song`, `Artist` - Core music entities
- `TopSongsResponse`, `NewSongsResponse`, `TopArtistsResponse` - API response types
- `SimplifiedTrack`, `SimplifiedArtist`, `SimplifiedAlbum`, `SimplifiedRecord`, `SimplifiedSong` - Simplified types for different pages

### `user.ts`
User and authentication related interfaces:
- `SignInForm`, `SignUpForm` - Form data types
- `UserPayload`, `AuthResponse` - User data and API responses
- `UserContextType` - React context type

### `components.ts`
Component-related interfaces:
- `CardProps`, `CardType` - Card component types
- `CardSectionProps` - Card section component type
- `InputProps`, `ButtonProps` - Form component types
- `ThreadsProps` - Animation component type

### `api.ts`
API and data fetching related interfaces:
- `UseDataReturn<T>` - Custom hook return type


## Usage Examples

```typescript
import type { Song, Artist } from '../types/music';
import type { UserPayload } from '../types/user';
import type { CardProps } from '../types/components';

import type { Song, UserPayload, CardProps } from '../types';

const MyComponent: React.FC<{ song: Song }> = ({ song }) => {
};
```

## Migration Notes

- Old type files in pages are deprecated but still re-export for backward compatibility
- All imports have been updated to use the new centralized types
- New types should be added to the appropriate category file
- If a type doesn't fit existing categories, create a new file
