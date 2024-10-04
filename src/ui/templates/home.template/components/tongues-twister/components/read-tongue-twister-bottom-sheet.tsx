import { useMemo } from 'react'
import { ActivityIndicator } from 'react-native'

import { useTonguesTwisterContext } from '../contexts/tongues-twister.context/hooks'
import { useGetTongueTwisterById } from '@/hooks/http/use-get-tongue-twister-by-id'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Paragraphs } from '@/ui/components/paragraphs'
import { Typography } from '@/ui/atoms/typography'

import { getSentencesWithBreakLine } from '@/helpers/general'

export function ReadTongueTwisterBottomSheet() {
	const { tongueTwisterId, readTongueTwisterBottomSheetRef } = useTonguesTwisterContext()
	const { tongueTwister, isLoading } = useGetTongueTwisterById(tongueTwisterId)

	const tongueTwisterSentences = useMemo(() => {
		if (!tongueTwister) return []
		return getSentencesWithBreakLine(tongueTwister.body)
	}, [tongueTwister])

	const hasTongueTwisterSentences = !!tongueTwisterSentences.length

	return (
		<BottomSheetScrollViewModal ref={readTongueTwisterBottomSheetRef}>
			{hasTongueTwisterSentences && (
				<>
					<Paragraphs paragraphs={tongueTwisterSentences} />
					<Typography.Paragraph className="text-base-text-muted mt-4">
						Autor: {tongueTwister?.authorName || 'Não informado'}
					</Typography.Paragraph>
				</>
			)}
			{!hasTongueTwisterSentences && isLoading && <ActivityIndicator />}
		</BottomSheetScrollViewModal>
	)
}
