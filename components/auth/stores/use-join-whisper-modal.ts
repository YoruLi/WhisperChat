import { create } from "zustand";

type joinWhisperModalProps = {
    data: {
        isModalOpen: boolean;
        action: string;
    };
    setData: (data: { isModalOpen: boolean; action: string }) => void;
};

export const useJoinWhisperModal = create<joinWhisperModalProps>(set => ({
    data: {
        isModalOpen: false,
        action: "",
    },

    setData: data => {
        set({ data });
    },
}));
