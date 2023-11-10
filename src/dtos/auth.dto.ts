import { UserEntity } from "@/entities/user.entity";

export interface AuthInputDTO extends Omit<UserEntity, "id"> {}
