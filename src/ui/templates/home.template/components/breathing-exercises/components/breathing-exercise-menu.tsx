import { FlameIcon } from 'lucide-react-native'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { MenuOptions } from '@/ui/components/menu-options'

import { useBreathingExercisesContext } from '../contexts/breathing-exercises.context/hooks'

export function BreathingExerciseMenu() {
	const { breathingExerciseMenuBottomSheetRef } = useBreathingExercisesContext()
	return (
		<BottomSheetScrollViewModal ref={breathingExerciseMenuBottomSheetRef}>
			<MenuOptions.Root>
				<MenuOptions.Content>
					<MenuOptions.Option variant='primary' label='Adicionar meta' renderIcon={(_props) => <FlameIcon {..._props} />} />
				</MenuOptions.Content>
			</MenuOptions.Root>
		</BottomSheetScrollViewModal>
	)
}
