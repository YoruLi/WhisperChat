import { create } from "zustand";

type showProfileInfoProps = {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

export const useShowProfileInfo = create<showProfileInfoProps>(set => ({
    isModalOpen: false,
    openModal: () =>
        set(state => ({
            isModalOpen: true,
        })),
    closeModal: () =>
        set(state => ({
            isModalOpen: false,
        })),
}));
