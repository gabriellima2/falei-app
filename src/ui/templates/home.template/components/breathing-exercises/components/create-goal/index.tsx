import { Typography } from '@/ui/atoms/typography'
import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'

import { useBreathingExercisesContext } from '../../contexts/breathing-exercises.context/hooks'

export function CreateGoal() {
	const { createGoalBottomSheetRef } = useBreathingExercisesContext()
	return (
		<BottomSheetScrollViewModal ref={createGoalBottomSheetRef}>
			<Typography.Title>Create...</Typography.Title>
		</BottomSheetScrollViewModal>
	)
}
