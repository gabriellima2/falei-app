import { forwardRef, useRef } from 'react'
import { Flame, NotebookText } from 'lucide-react-native'

import { CreateBreathingExerciseBottomSheet } from './components/create-breathing-exercise-bottom-sheet'
import { CreateReadExerciseBottomSheet } from './components/create-read-exercise-bottom-sheet'
import { BottomSheetScrollViewModal } from '../bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'
import { MenuOptions } from '../../menu-options'

import type { BottomSheetModalElementRef } from '@/@types/general'

export const CreateExerciseBottomSheet = forwardRef<
	BottomSheetModalElementRef,
	object
>((_, ref) => {
	const createReadExerciseBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const createBreathingExerciseBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	return (
		<>
			<BottomSheetScrollViewModal ref={ref}>
				<Typography.Title>
					Qual tipo de exercício você deseja criar?
				</Typography.Title>
				<MenuOptions.Root className="mt-4">
					<MenuOptions.Content>
						<MenuOptions.Option
							variant="primary"
							label="Respiração"
							onPress={() =>
								createBreathingExerciseBottomSheetRef.current?.present()
							}
							renderIcon={(_props) => <Flame {..._props} />}
						/>
						<MenuOptions.Option
							variant="success"
							label="Leitura"
							onPress={() =>
								createReadExerciseBottomSheetRef.current?.present()
							}
							renderIcon={(_props) => <NotebookText {..._props} />}
						/>
					</MenuOptions.Content>
				</MenuOptions.Root>
			</BottomSheetScrollViewModal>
			<CreateBreathingExerciseBottomSheet
				ref={createBreathingExerciseBottomSheetRef}
			/>
			<CreateReadExerciseBottomSheet ref={createReadExerciseBottomSheetRef} />
		</>
	)
})
