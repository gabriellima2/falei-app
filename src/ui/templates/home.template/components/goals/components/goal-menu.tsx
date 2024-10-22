import { Trash2 } from 'lucide-react-native'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { MenuOptions } from '@/ui/components/menu-options'

import { useGoalsContext } from '../contexts/goals.context/hooks'

export function GoalMenu() {
	const { goalMenuBottomSheetRef } = useGoalsContext()
	return (
		<BottomSheetScrollViewModal ref={goalMenuBottomSheetRef}>
			<MenuOptions.Root>
				<MenuOptions.Content>
					<MenuOptions.Option
						variant="danger"
						label="Excluir meta"
						onPress={console.log}
						renderIcon={(_props) => <Trash2 {..._props} />}
					/>
				</MenuOptions.Content>
			</MenuOptions.Root>
		</BottomSheetScrollViewModal>
	)
}
