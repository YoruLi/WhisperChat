import { Database } from "./supabase";

export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type UpdateProfile = Database["public"]["Tables"]["profiles"]["Update"];
export type Comments = Database["public"]["Tables"]["comments"]["Row"];
