import { ScrollView } from 'react-native'

import { Radio } from '@/ui/atoms/radio'

import { FILTER_BY_GOAL_STATUS } from '@/constants/general'
import type { FilterByGoalStatus } from '@/@types/general'

type FilterByStatusProps = {
	status: FilterByGoalStatus
	onStatusChange: (status: FilterByGoalStatus) => void
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
				onValueChange={(type) => onStatusChange(type as FilterByGoalStatus)}
			>
				<Radio.Item value={FILTER_BY_GOAL_STATUS.ALL} label="Todos" />
				<Radio.Item value={FILTER_BY_GOAL_STATUS.PENDING} label="Pendentes" />
				<Radio.Item value={FILTER_BY_GOAL_STATUS.COMPLETED} label="Completados" />
			</Radio.Group>
		</ScrollView>
	)
}
