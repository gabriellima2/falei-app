import { UserEntity } from "./user-entity";

export class GenericExerciseEntity {
	constructor(
		public readonly id: string,
		public readonly user_id?: Pick<UserEntity, "id">
	) {}
}
