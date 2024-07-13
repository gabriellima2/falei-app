import type {
	CreateBreathingInputDTO,
	CreateBreathingOutputDTO,
	GetAllBreathingOutputDTO,
	GetBreathingByIdOutputDTO,
} from "@/dtos/breathing.dto";

export interface BreathingService {
	getAll(): GetAllBreathingOutputDTO;
	getById(id: string): GetBreathingByIdOutputDTO;
	create(
		userID: string,
		params: CreateBreathingInputDTO
	): CreateBreathingOutputDTO;
	delete(id: string): Promise<void>;
}
