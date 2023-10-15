import { PostResponse } from "@/types/contexts/data";
import { create } from "zustand";

interface ModalProps {
    isModalOpen: any;
    openModal: () => void;
    closeModal: () => void;
    parent_post: PostResponse | null;
    setParentPost: (post: PostResponse | null) => void;
    in_reply_to_status_id: string | null;
    setStatusId: (status_id: string | null) => void;
    placeholder: string | null;
    setPlaceholder: (placeholder: string | null) => void;
}

export const useCreatePostModal = create<ModalProps>(set => ({
    isModalOpen: false,
    openModal: () => {
        set({ isModalOpen: true });
    },
    closeModal: () => {
        set({ isModalOpen: false });
        set({ parent_post: null });
    },
    parent_post: null,
    setParentPost: post => set({ parent_post: post }),
    in_reply_to_status_id: null,
    setStatusId: status_id => set({ in_reply_to_status_id: status_id }),
    placeholder: "Start a whisper...",
    setPlaceholder: placeholder => set({ placeholder: placeholder }),
}));
