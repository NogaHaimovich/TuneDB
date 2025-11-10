import type { SimplifiedRecord } from "../../types/music";

export interface UseRecordDataReturn  {
    record: SimplifiedRecord  | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}