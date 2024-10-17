import { ActivityIndicator } from 'react-native'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { useBreathingExercisesContext } from '../contexts/breathing-exercises.context/hooks'

export function BreathingExerciseMenu() {
	const { breathingExerciseMenuRef } = useBreathingExercisesContext()
	return (
		<BottomSheetScrollViewModal ref={breathingExerciseMenuRef}>
			<ActivityIndicator />
		</BottomSheetScrollViewModal>
	)
}
