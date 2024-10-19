import { useCallback, useState } from 'react'
import { View } from 'react-native'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/atoms/buttons/button'
import { Radio } from '@/ui/atoms/radio'

import { useBreathingExercisesContext } from '../../contexts/breathing-exercises.context/hooks'
import { useCreateGoal } from './hooks/use-create-goal'

export function CreateGoal() {
	const { isCreating, handleCreate } = useCreateGoal()
	const { breathingExerciseId, createGoalBottomSheetRef } =
		useBreathingExercisesContext()
	const [frequencyPerWeek, setFrequencyPerWeek] = useState(1)

	async function handleSubmit() {
		if (!breathingExerciseId) return
		await handleCreate({ breathingExerciseId, frequencyPerWeek })
	}

	const handleCancel = useCallback(() => {
		createGoalBottomSheetRef?.current?.close()
	}, [createGoalBottomSheetRef])

	const handleFrequencyPerWeekChange = useCallback(
		(value?: string | number) => {
			const formattedValue = Number(value)
			if (Number.isNaN(formattedValue)) return
			setFrequencyPerWeek(formattedValue)
		},
		[],
	)

	return (
		<BottomSheetScrollViewModal ref={createGoalBottomSheetRef}>
			<View>
				<Typography.Title>Qual será a sua meta semanal?</Typography.Title>
				<Radio.Group
					defaultValue={1}
					onValueChange={handleFrequencyPerWeekChange}
				>
					{frequencyPerWeekOptions.map((option) => (
						<Radio.Item key={option} value={option} label={`${option}x`} />
					))}
				</Radio.Group>
			</View>
			<View className="flex-row mt-8">
				<Button
					variant="destructive-text"
					label="Cancelar"
					onPress={handleCancel}
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
