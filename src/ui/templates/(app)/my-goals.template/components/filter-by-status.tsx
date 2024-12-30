import { ScrollView } from 'react-native'

import { Radio } from '@/ui/atoms/radio'

import { GOAL_STATUS } from '@/constants/general'
import type { GoalStatus } from '@/@types/general'

type FilterByStatusProps = {
	status: GoalStatus
	onStatusChange: (status: GoalStatus) => void
}

export function FilterByStatus(props: FilterByStatusProps) {
	const { status, onStatusChange } = props
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className="mb-8"
		>
			<Radio.Group
				value={status}
				onValueChange={(type) => onStatusChange(type as GoalStatus)}
			>
				<Radio.Item value={GOAL_STATUS.ALL} label="Todos" />
				<Radio.Item value={GOAL_STATUS.PENDING} label="Pendentes" />
				<Radio.Item value={GOAL_STATUS.COMPLETED} label="Completados" />
			</Radio.Group>
		</ScrollView>
	)
}
