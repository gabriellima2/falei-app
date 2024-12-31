import { View } from 'react-native'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/atoms/buttons/button'
import { Radio } from '@/ui/atoms/radio'

import { useBreathingExercisesContext } from '../../contexts/breathing-exercises.context/hooks'
import { useFrequencyPerWeek } from './hooks/use-frequency-per-week'
import { useCreateGoal } from './hooks/use-create-goal'

export function CreateGoalBottomSheet() {
	const { isCreating, handleCreate } = useCreateGoal()
	const { frequencyPerWeek, handleSetFrequencyPerWeek } = useFrequencyPerWeek()
	const {
		breathingExerciseId,
		createGoalBottomSheetRef,
		handleCloseCreateGoalBottomSheet,
	} = useBreathingExercisesContext()

	function handleSubmit() {
		if (!breathingExerciseId) return
		handleCreate({ breathingExerciseId, frequencyPerWeek })
	}

	return (
		<BottomSheetScrollViewModal
			ref={createGoalBottomSheetRef}
			disableClose={isCreating}
		>
			<View>
				<Typography.Title>Qual será a sua meta semanal?</Typography.Title>
				<Radio.Group
					value={frequencyPerWeek}
					onValueChange={handleSetFrequencyPerWeek}
					className="mt-3"
				>
					{frequencyPerWeekOptions.map((option) => (
						<Radio.Item
							key={option}
							value={option}
							label={`${option}x`}
							className="max-w-[60px] min-w-[60px] h-10 rounded-xl mt-4"
						/>
					))}
				</Radio.Group>
			</View>
			<View className="flex-row mt-8">
				<Button
					variant="destructive-text"
					label="Cancelar"
					onPress={handleCloseCreateGoalBottomSheet}
					disabled={isCreating}
					className="flex-1 mr-4"
				/>
				<Button
					label="Confirmar"
					onPress={handleSubmit}
					isLoading={isCreating}
					className="flex-1"
				/>
			</View>
		</BottomSheetScrollViewModal>
	)
}

const frequencyPerWeekOptions = [1, 2, 3, 4, 5, 6, 7]
