import type { BottomSheetModalRef } from "@/@types/general"

export type GoalsContextValues = {
	goalId: string | null

	goalMenuBottomSheetRef: BottomSheetModalRef | null
	deleteGoalBottomSheetRef: BottomSheetModalRef | null

	handleOpenGoalMenu: (id: string | null) => void
	handleCloseGoalMenu: () => void
	handleOpenDeleteGoalBottomSheet: () => void
	handleCloseDeleteGoalBottomSheet: () => void
}
