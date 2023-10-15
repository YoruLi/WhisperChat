import { create } from "zustand";

type PreviewImageProps = {
    showReceiverInfo: boolean;
    setShowReceiverInfo: any;
};

export const useReceiverInfo = create<PreviewImageProps>(set => ({
    showReceiverInfo: false,
    setShowReceiverInfo: () => {
        set(state => ({
            showReceiverInfo: !state.showReceiverInfo,
        }));
    },
}));
