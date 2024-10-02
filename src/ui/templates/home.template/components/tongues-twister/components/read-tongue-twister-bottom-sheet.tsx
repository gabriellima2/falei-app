import { useTonguesTwisterContext } from '../contexts/tongues-twister.context/hooks/use-tongues-twister-context'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'

export function ReadTongueTwisterBottomSheet() {
	const { tongueTwisterId, readTongueTwisterBottomSheetRef } = useTonguesTwisterContext()
	return (
		<BottomSheetScrollViewModal ref={readTongueTwisterBottomSheetRef}>
			<Typography.Title>{tongueTwisterId}</Typography.Title>
		</BottomSheetScrollViewModal>
	)
}
