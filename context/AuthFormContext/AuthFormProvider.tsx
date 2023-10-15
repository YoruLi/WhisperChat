import React, { useContext } from "react";
import AuthFormContext from "./AuthFormContext";
import { supabase } from "@/utils/supabase";

import { formSchema } from "@/validation/zod";
import { mapErrors } from "@/validation/mapErrors";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const AuthFormProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const signUpWithEmail = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    email: email,
                },
            },
        });

        if (error) {
            return { success: false, error };
        }

        return { success: true };
    };
    const signInWithEmail = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            return { success: false, error };
        }
        return { success: true };
    };

    const handleSignUpWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";
        const validation = formSchema.safeParse({ email: email, password: password });

        if (!validation.success) {
            console.log(validation.error.issues);
            toast.error(`${mapErrors(validation.error.issues).join("\n")}`);
            return;
        }

        const res = await signUpWithEmail(email, password);
        if (res.success) {
            return res;
        }

        if (res.error?.status === 429) {
            toast.error("Éste servicio no está disponible en estos momentos. Por favor, intenta con otros proveedores.");
        } else {
            toast.error("¡Ha ocurrido un error inesperado!");
        }
    };

    const handleSignInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")?.toString() ?? "";
        const password = formData.get("password")?.toString() ?? "";

        const validation = formSchema.safeParse({ email: email, password: password });

        if (!validation.success) {
            return toast.error(`${mapErrors(validation.error.issues).join("\n")}`, {
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
        }

        const res = await signInWithEmail(email, password);

        if (res.success) {
            router.push("/home");
            router.refresh();
            return res;
        }

        if (res.error?.status === 429) {
            toast.error("Éste servicio no está disponible en estos momentos. Por favor, intenta con otros proveedores.");
        }

        if (res.error?.status === 400) {
            toast.error(`${res.error.message}`);
        } else {
            toast.error("¡Ha ocurrido un error inesperado!");
        }
    };

    return <AuthFormContext.Provider value={{ handleSignUpWithEmail, handleSignInWithEmail }}>{children}</AuthFormContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthFormContext);

    if (context === undefined) {
        throw new Error("useSupabase must be used inside SupabaseProvider");
    }

    return context;
};
