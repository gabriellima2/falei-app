import type {
	BreathingExerciseEntity,
	BreathingStepNames,
} from "@/entities/breathing-entities";

export type DoBreathingExerciseContextProperties = {
	exerciseId: string;

	currentStep: BreathingStepNames;
	handleChangeCurrentStep: (step: BreathingStepNames) => void;

	currentRound: number;
	handleIncrementCurrentRound: () => void;

	status: BreathingStatus;
	handleChangeStatus: (newStatus: BreathingStatus) => void;

	toggleStepCount: number;
	handleIncrementToggleStepCount: () => void;

	breathing: BreathingExerciseEntity | undefined;
	isLoading: boolean;
};
