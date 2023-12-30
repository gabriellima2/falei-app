import type { UserCredential } from "firebase/auth";
import type { UserEntity } from "@/entities/user.entity";

export type AuthInputDTO = Omit<UserEntity, "id" | "email"> & { email: string };
export type AuthOutputDTO = Promise<UserCredential>;
