import type {
	BreathingExerciseEntity,
	BreathingStepNames,
} from "@/entities/breathing-entities";

export type DoBreathingExerciseContextProperties = {
	exerciseId: string;

	currentStep: BreathingStepNames;
	handleChangeCurrentStep: (step: BreathingStepNames) => void;

	currentRound: number;
	handleChangeCurrentRound: (round: number) => void;

	breathing: BreathingExerciseEntity | undefined;
	isLoading: boolean;
};
