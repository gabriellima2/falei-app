import type { BottomSheetModalRef } from "@/@types/general"

export type BreathingExercisesContextValues = {
		breathingExerciseMenuRef: BottomSheetModalRef | null
		breathingExerciseId: string | null

		handleOpenBreathingExerciseMenu: (id: string | null) => void
	}
