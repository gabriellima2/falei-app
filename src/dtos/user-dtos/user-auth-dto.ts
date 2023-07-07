import { UserEntity } from "@/entities";

export interface UserAuthRequestDTO extends Omit<UserEntity, "id"> {}
