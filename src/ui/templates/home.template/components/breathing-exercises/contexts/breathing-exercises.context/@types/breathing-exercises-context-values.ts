import type { BottomSheetModalRef } from "@/@types/general"

export type BreathingExercisesContextValues = {
		breathingExerciseId: string | null

		createGoalBottomSheetRef: BottomSheetModalRef | null
		breathingExerciseMenuBottomSheetRef: BottomSheetModalRef | null

		handleOpenBreathingExerciseMenu: (id: string | null) => void
		handleOpenCreateGoal: () => void
	}
