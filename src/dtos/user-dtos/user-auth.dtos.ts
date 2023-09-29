import { UserEntity } from "@/entities";

export interface UserAuthInputDTO extends Omit<UserEntity, "id"> {}
