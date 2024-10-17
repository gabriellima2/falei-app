import { ActivityIndicator } from 'react-native'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { useBreathingExercisesContext } from '../contexts/breathing-exercises.context/hooks'

export function BreathingExerciseMenu() {
	const { breathingExerciseMenuBottomSheetRef } = useBreathingExercisesContext()
	return (
		<BottomSheetScrollViewModal ref={breathingExerciseMenuBottomSheetRef}>
			<ActivityIndicator />
		</BottomSheetScrollViewModal>
	)
}
