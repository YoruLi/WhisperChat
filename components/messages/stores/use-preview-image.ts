import { create } from "zustand";

type PreviewImageProps = {
    previewImage: string | ArrayBuffer | null;
    setPreviewImage: (fileData: string | ArrayBuffer | null) => void;
};

export const usePreviewImage = create<PreviewImageProps>(set => ({
    previewImage: "",
    setPreviewImage: fileData => {
        set({ previewImage: fileData });
    },
}));
