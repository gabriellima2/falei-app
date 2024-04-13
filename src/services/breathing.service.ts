import { GetAllBreathingOutputDTO } from "@/dtos/breathing.dto";

export interface BreathingService {
	getAll(): GetAllBreathingOutputDTO;
}
