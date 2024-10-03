import { useMemo } from 'react'

import { useTonguesTwisterContext } from '../contexts/tongues-twister.context/hooks'
import { useGetTongueTwisterById } from '@/hooks/http/use-get-tongue-twister-by-id'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'

import { getSentencesWithBreakLine } from '@/helpers/general'

export function ReadTongueTwisterBottomSheet() {
	const { tongueTwisterId, readTongueTwisterBottomSheetRef } = useTonguesTwisterContext()
	const { tongueTwister } = useGetTongueTwisterById(tongueTwisterId)

	const sentences = useMemo(() => {
		if (!tongueTwister) return []
		return getSentencesWithBreakLine(tongueTwister.body)
	}, [tongueTwister])

	return (
		<BottomSheetScrollViewModal ref={readTongueTwisterBottomSheetRef}>
			{sentences.map((sentence, index) => (
				<Typography.Paragraph key={index} className="text-base">
					{sentence.trim()}
				</Typography.Paragraph>
			))}
			<Typography.Paragraph className="text-base-text-muted mt-4">
				Autor: {tongueTwister?.authorName || 'Não informado'}
			</Typography.Paragraph>
		</BottomSheetScrollViewModal>
	)
}
