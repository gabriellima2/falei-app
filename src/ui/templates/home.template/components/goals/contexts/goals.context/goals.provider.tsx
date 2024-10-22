import { useCallback, useRef, useState, type PropsWithChildren } from 'react'

import { GoalMenu } from '../../components/goal-menu'
import { GoalsContext } from './goals.context'

import type { BottomSheetModalElementRef } from '@/@types/general'

export function GoalsProvider(props: PropsWithChildren) {
	const goalMenuBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const [goalId, setGoalId] = useState<string | null>(null)

	const handleOpenGoalMenu = useCallback((id: string | null) => {
		goalMenuBottomSheetRef.current?.present()
		setGoalId(id)
	}, [])

	return (
		<GoalsContext.Provider
			value={{
				goalId,

				goalMenuBottomSheetRef,
				handleOpenGoalMenu,
			}}
		>
			<GoalMenu />
			{props.children}
		</GoalsContext.Provider>
	)
}
