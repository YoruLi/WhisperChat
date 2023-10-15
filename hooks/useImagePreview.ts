import { usePreviewImage } from "@/components/messages/stores/use-preview-image";
import React, { useRef, useState } from "react";

export default function useImagePreview() {
    const previewImage = usePreviewImage(state => state.previewImage);
    const setPreviewImage = usePreviewImage(state => state.setPreviewImage);
    const imageRef = useRef(null);
    const handleImageUpload = (e: any) => {
        imageRef.current = e.target.files[0];

        if (imageRef.current) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(imageRef.current);
        }
        setPreviewImage(null);
    };

    return {
        previewImage,
        setPreviewImage,
        handleImageUpload,
        imageRef,
    };
}
