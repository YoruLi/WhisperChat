import { create } from "zustand";

interface ModalProps {
    isPostImageModal: boolean;
    openPostImageModal: () => void;
    closePostImageModal: () => void;
    postId: string;
    indexImage: number;
    setPostId: (postId: string, indexImage: number) => void;
}

export const usePostImageModal = create<ModalProps>(set => ({
    isPostImageModal: false,
    openPostImageModal: () => set({ isPostImageModal: true }),
    closePostImageModal: () => set({ isPostImageModal: false }),
    postId: "",
    indexImage: 0,
    setPostId: (postId: string, indexImage: number) => set({ postId: postId, indexImage: indexImage }),
}));
