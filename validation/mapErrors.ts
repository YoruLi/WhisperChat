import { ZodIssue } from "zod";

export const mapErrors = (errors: ZodIssue[]) => errors.map(({ message }) => message);
