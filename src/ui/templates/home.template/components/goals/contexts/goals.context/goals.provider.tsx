import { useCallback, useRef, useState, type PropsWithChildren } from 'react'

import { DeleteGoalBottomSheet } from '../../components/delete-goal-bottom-sheet'
import { GoalMenu } from '../../components/goals-menu'
import { GoalsContext } from './goals.context'

import type { BottomSheetModalElementRef } from '@/@types/general'

export function GoalsProvider(props: PropsWithChildren) {
	const deleteGoalBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const goalMenuBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const [goalId, setGoalId] = useState<string | null>(null)

	const handleOpenGoalMenu = useCallback((id: string | null) => {
		goalMenuBottomSheetRef.current?.present()
		setGoalId(id)
	}, [])

	const handleOpenDeleteGoalBottomSheet = useCallback(() => {
		deleteGoalBottomSheetRef.current?.present()
	}, [])

	return (
		<GoalsContext.Provider
			value={{
				goalId,

				goalMenuBottomSheetRef,
				deleteGoalBottomSheetRef,

				handleOpenGoalMenu,
				handleOpenDeleteGoalBottomSheet,
			}}
		>
			<GoalMenu />
			<DeleteGoalBottomSheet />
			{props.children}
		</GoalsContext.Provider>
	)
}
