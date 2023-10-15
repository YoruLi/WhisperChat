import { UpdateProfile, UpdateProfileData } from "@/types/contexts/data";
import { Profile } from "@/types/schemas";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const updateProfile: UpdateProfile = async (userId, values) => {
    if (!values) {
        return;
    }

    const { data, error } = await supabase
        .from("profiles")
        .update({
            full_name: values.full_name,
            status: values.status,
            profile_picture: values?.profile_picture.url,
        })
        .eq("id", userId)
        .select()
        .single();

    if (error) {
        return { success: false, error };
    }

    return data;
};

export const useUpdateProfile = (userId: string) => {
    const querClient = useQueryClient();

    return useMutation(
        ({ userId, profileInfo }: { userId: Profile["id"]; profileInfo: UpdateProfileData }) => {
            return updateProfile(userId, profileInfo);
        },
        {
            onSuccess: () => {
                console.log("success");
                querClient.invalidateQueries(["users", userId]);
            },

            onError: error => {
                console.error(error);
            },
            onSettled: () => {},
        }
    );
};
