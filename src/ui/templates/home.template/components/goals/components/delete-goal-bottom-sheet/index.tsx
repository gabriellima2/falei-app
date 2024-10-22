import { View } from 'react-native'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Button } from '@/ui/atoms/buttons/button'
import { Typography } from '@/ui/atoms/typography'

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
		<BottomSheetScrollViewModal
			ref={deleteGoalBottomSheetRef}
			disableClose={isDeleting}
		>
			<Typography.Title>Realmente deseja deletar a meta?</Typography.Title>
			<View className="flex-row mt-8">
				<Button
					variant="destructive-text"
					label="Cancelar"
					onPress={handleCloseDeleteGoalBottomSheet}
					disabled={isDeleting}
					className="flex-1 mr-4"
				/>
				<Button
					label="Confirmar"
					onPress={handleConfirm}
					isLoading={isDeleting}
					className="flex-1"
				/>
			</View>
		</BottomSheetScrollViewModal>
	)
}
