import { create } from "zustand";

type searchModalProps = {
    isModalOpen: any;
    toggleModal: () => void;
    closeModal: () => void;
};

export const useSearchModal = create<searchModalProps>(set => ({
    isModalOpen: false,
    toggleModal: () => set(state => ({ isModalOpen: !state.isModalOpen })),

    closeModal: () =>
        set(state => ({
            isModalOpen: false,
        })),
}));
