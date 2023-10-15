import { create } from "zustand";

type EditProfilePros = {
    isEditProfileModalOpen: boolean;
    openEditProfileModal: () => void;
    closeEditProfileModal: () => void;
};

export const useEditProfile = create<EditProfilePros>(set => ({
    isEditProfileModalOpen: false,
    openEditProfileModal: () => set({ isEditProfileModalOpen: true }),
    closeEditProfileModal: () => set({ isEditProfileModalOpen: false }),
}));
