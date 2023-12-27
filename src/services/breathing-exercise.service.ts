import { GetAllBreathingExerciseOutputDTO } from "@/dtos/breathing-exercise.dto";

export interface BreathingExerciseService {
	getAll(): GetAllBreathingExerciseOutputDTO;
}
