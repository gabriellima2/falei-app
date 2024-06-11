import type {
	CreateTongueTwisterInputDTO,
	CreateTongueTwisterOutputDTO,
} from "@/dtos/tongue-twister.dto";

export interface TongueTwisterService {
	create(
		userID: string,
		params: CreateTongueTwisterInputDTO
	): CreateTongueTwisterOutputDTO;
}
