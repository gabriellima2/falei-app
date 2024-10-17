import { useCallback, useRef, useState, type PropsWithChildren } from 'react'

import { BreathingExerciseMenu } from '../../components/breathing-exercise-menu'
import { BreathingExercisesContext } from './breathing-exercises.context'

import type { BottomSheetModalElementRef } from '@/@types/general'

export function BreathingExercisesProvider(props: PropsWithChildren) {
	const breathingExerciseMenuBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const [breathingExerciseId, setBreathingExerciseId] = useState<string | null>(null)

	const handleOpenBreathingExerciseMenu = useCallback(
		(id: string | null) => {
			breathingExerciseMenuBottomSheetRef.current?.present()
			setBreathingExerciseId(id)
		},
		[],
	)

	return (
		<BreathingExercisesContext.Provider
			value={{
				breathingExerciseMenuBottomSheetRef,

				breathingExerciseId,
				handleOpenBreathingExerciseMenu,
			}}
		>
			<BreathingExerciseMenu />
			{props.children}
		</BreathingExercisesContext.Provider>
	)
}
