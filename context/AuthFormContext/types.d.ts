import { SignInWithEmail, SignUpWithEmail } from "@/types/contexts/data";

export interface AuthFormContext {
    handleSignUpWithEmail: SignUpWithEmail;
    handleSignInWithEmail: SignInWithEmail;
}
