import z from "zod";

export const formSchema = z
    .object({
        email: z.string().email().min(1, "Email es requerido").email("Email invalido"),
        password: z.string().min(1, "La contraseña es requerida").min(6, "La contraseña debe contener más de 6 caracteres"),
    })
    .superRefine((values, ctx) => {
        if (!values.email && !values.password) {
            ctx.addIssue({
                message: "Todos los campos son obligatorios",
                code: z.ZodIssueCode.custom,
                path: ["email"],
            });
        }
    });

export type FormData = z.infer<typeof formSchema>;
