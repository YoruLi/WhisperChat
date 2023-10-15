import toast from "react-hot-toast";

export const postMedia = async (files: any, supabase: any) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    try {
        const uploadedMediaPaths: string[] = [];

        for (const file of files) {
            const decodedFileName = decodeURIComponent(file.name);
            const { data, error } = await supabase.storage.from("whisper-bucket").upload(`${user?.email}/${Date.now()}/${decodedFileName}`, file, {
                cacheControl: "3600",
                upsert: false,
            });

            if (error) {
                toast.error("Error al insertar imagei", {
                    style: {
                        border: "1px solid rgb(185 28 28)",
                        color: "rgb(185 28 28)",
                        backgroundColor: "#181920",
                    },
                    icon: "✖",
                    iconTheme: {
                        primary: "rgb(185 28 28)",
                        secondary: "#FFFAEE",
                    },
                });
                console.error(error);

                throw new Error("Failed to upload image");
            }

            uploadedMediaPaths.push("https://ifweifsbugrkcnnwttqn.supabase.co/storage/v1/object/public/whisper-bucket/" + data.path);
        }

        return uploadedMediaPaths;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to upload media");
    }
};
