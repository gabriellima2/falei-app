import type {
	CreateBreathingInputDTO,
	CreateBreathingOutputDTO,
	GetAllBreathingOutputDTO,
} from "@/dtos/breathing.dto";

export interface BreathingService {
	getAll(): GetAllBreathingOutputDTO;
	create(
		userID: string,
		params: CreateBreathingInputDTO
	): CreateBreathingOutputDTO;
	delete(id: string): Promise<void>;
}
