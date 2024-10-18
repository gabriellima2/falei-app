import { useState } from 'react'
import { View } from 'react-native'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'
import { Button } from '@/ui/atoms/buttons/button'
import { Radio } from '@/ui/atoms/radio'

import { useBreathingExercisesContext } from '../../contexts/breathing-exercises.context/hooks'

export function CreateGoal() {
	const { createGoalBottomSheetRef } = useBreathingExercisesContext()
	const [value, setValue] = useState('1')
	return (
		<BottomSheetScrollViewModal ref={createGoalBottomSheetRef}>
			<View>
				<Typography.Title>Qual será a sua meta semanal?</Typography.Title>
				<Radio.Group defaultValue={1} onValueChange={console.log}>
					{options.map((option, index) => (
						<Radio.Item key={option} value={index + 1} label={option} />
					))}
				</Radio.Group>
			</View>
			<View className="flex-row mt-8">
				<Button
					variant="destructive-text"
					label="Cancelar"
					className="flex-1 mr-4"
				/>
				<Button label="Confirmar" className="flex-1" />
			</View>
		</BottomSheetScrollViewModal>
	)
}

const options = ['1x', '2x', '3x', '4x', '5x', '6x', '7x']
