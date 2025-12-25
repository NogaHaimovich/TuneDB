import { z } from "zod";

export const createPlaylistSchema = z.object({
  body: z.object({
    playlistName: z
      .string()
      .min(1, "Playlist name is required")
      .max(100, "Playlist name must be at most 100 characters"),
  }),
});

export const addTrackSchema = z.object({
  params: z.object({
    trackId: z
      .string()
      .min(1, "Track ID is required"),
  }),
  body: z.object({
    playlistId: z
      .string()
      .min(1, "Playlist ID is required"),
    title: z
      .string()
      .optional(),
    artist: z
      .string()
      .optional(),
    album: z
      .string()
      .optional(),
    image: z
      .string()
      .optional()
      .refine((val) => !val || val === "" || z.string().url().safeParse(val).success, {
        message: "Image must be a valid URL",
      }),
  }),
});

export const deletePlaylistSchema = z.object({
  body: z.object({
    playlistId: z
      .string()
      .min(1, "Playlist ID is required"),
  }),
});

export const renamePlaylistSchema = z.object({
  body: z.object({
    playlistId: z
      .string()
      .min(1, "Playlist ID is required"),
    newName: z
      .string()
      .min(1, "New name is required")
      .max(100, "Playlist name must be at most 100 characters"),
  }),
});

