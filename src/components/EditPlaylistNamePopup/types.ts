export interface EditPlaylistNamePopupProps {
  isOpen: boolean;
  initialName: string;
  error?: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}