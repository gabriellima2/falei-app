import type { BottomSheetModalRef } from "@/@types/general"

export type BreathingExercisesContextValues = {
		breathingExerciseMenuBottomSheetRef: BottomSheetModalRef | null
		breathingExerciseId: string | null

		handleOpenBreathingExerciseMenu: (id: string | null) => void
	}
