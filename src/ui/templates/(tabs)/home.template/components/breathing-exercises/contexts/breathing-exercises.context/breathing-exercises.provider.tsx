import { useCallback, useRef, useState, type PropsWithChildren } from 'react'

import { CreateGoalBottomSheet } from '../../components/create-goal-bottom-sheet'
import { BreathingExerciseMenu } from '../../components/breathing-exercise-menu'
import { BreathingExercisesContext } from './breathing-exercises.context'

import type { BottomSheetModalElementRef } from '@/@types/general'

export function BreathingExercisesProvider(props: PropsWithChildren) {
	const createGoalBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const breathingExerciseMenuBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const [breathingExerciseId, setBreathingExerciseId] = useState<string | null>(null)

	const handleOpenBreathingExerciseMenu = useCallback((id: string | null) => {
		breathingExerciseMenuBottomSheetRef.current?.present()
		setBreathingExerciseId(id)
	}, [])

	const handleCloseBreathingExerciseMenu = useCallback(() => {
		breathingExerciseMenuBottomSheetRef.current?.close()
		setBreathingExerciseId(null)
	}, [])

	const handleOpenCreateGoalBottomSheet = useCallback(() => {
		createGoalBottomSheetRef.current?.present()
	}, [])

	const handleCloseCreateGoalBottomSheet = useCallback(() => {
		createGoalBottomSheetRef.current?.close()
	}, [])

	return (
		<BreathingExercisesContext.Provider
			value={{
				breathingExerciseId,

				breathingExerciseMenuBottomSheetRef,
				createGoalBottomSheetRef,

				handleOpenBreathingExerciseMenu,
				handleCloseBreathingExerciseMenu,

				handleOpenCreateGoalBottomSheet,
				handleCloseCreateGoalBottomSheet,
			}}
		>
			<CreateGoalBottomSheet />
			<BreathingExerciseMenu />
			{props.children}
		</BreathingExercisesContext.Provider>
	)
}
