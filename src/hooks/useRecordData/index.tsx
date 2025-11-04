import { useMemo } from "react";
import useData from "../useData";
import type { SimplifiedRecord } from "../../types/music";
import type { UseRecordDataReturn } from "./types";



const useRecordData = (recordId?: string): UseRecordDataReturn => {
    const endpoint = recordId ? `/deezer/record?id=${encodeURIComponent(recordId)}` : "";
    const { data, loading, error } = useData<any>(endpoint);

    const record: SimplifiedRecord | null = useMemo(() =>{
        if (!data) return null;
        return {
            id: data.id,
            title: data.title,
            preview: data.preview,
            duration: data.duration,
            releaseDate: data.release_date ?? "Unknown",
            artistName: data.artist?.name ?? "Unknown Artist",
            artistLink: data.artist?.link ?? "#",
            artistPicture: data.artist?.picture ?? "",
            albumTitle: data.album?.title ?? "Unknown Album",
            albumLink: data.album?.link ?? "#",
            albumCover: data.album?.cover ?? "",
            artistId: data.artist?.id ?? ""

        };
    }, [data]);

    return {record, loading, error};

}

export default useRecordData;