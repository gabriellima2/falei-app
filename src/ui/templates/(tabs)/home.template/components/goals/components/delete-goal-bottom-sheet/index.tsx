import { ConfirmBottomSheet } from '@/ui/components/bottom-sheet/confirm-bottom-sheet'

import { useGoalsContext } from '../../contexts/goals.context/hooks'
import { useDeleteGoal } from './hooks/use-delete-goal'

export function DeleteGoalBottomSheet() {
	const { goalId, deleteGoalBottomSheetRef, handleCloseDeleteGoalBottomSheet } = useGoalsContext()
	const { isDeleting, handleDelete } = useDeleteGoal()

	function handleConfirm() {
		if (!goalId) return
		handleDelete(goalId)
	}

	return (
		<ConfirmBottomSheet
			ref={deleteGoalBottomSheetRef}
			title='Realmente deseja deletar a meta?'
			isLoading={isDeleting}
			onConfirm={handleConfirm}
			onCancel={handleCloseDeleteGoalBottomSheet}
		/>
	)
}
