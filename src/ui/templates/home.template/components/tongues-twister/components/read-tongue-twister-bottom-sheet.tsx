import { useMemo } from 'react'
import { ActivityIndicator } from 'react-native'

import { useTonguesTwisterContext } from '../contexts/tongues-twister.context/hooks'
import { useGetTongueTwisterById } from '@/hooks/http/use-get-tongue-twister-by-id'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Paragraphs } from '@/ui/components/paragraphs'
import { AuthorName } from '@/ui/atoms/author-name'

import { getSentencesWithBreakLine } from '@/helpers/general'

export function ReadTongueTwisterBottomSheet() {
	const { tongueTwisterId, readTongueTwisterBottomSheetRef } = useTonguesTwisterContext()
	const { tongueTwister, isLoading } = useGetTongueTwisterById(tongueTwisterId)

	const tongueTwisterSentences = useMemo(() => {
		if (!tongueTwister) return []
		return getSentencesWithBreakLine(tongueTwister.body)
	}, [tongueTwister])

	const hasTongueTwisterSentences =
		!!tongueTwisterSentences.length && !!tongueTwister

	return (
		<BottomSheetScrollViewModal ref={readTongueTwisterBottomSheetRef}>
			{hasTongueTwisterSentences && (
				<>
					<Paragraphs paragraphs={tongueTwisterSentences} />
					<AuthorName name={tongueTwister.authorName} className='mt-4' />
				</>
			)}
			{!hasTongueTwisterSentences && isLoading && <ActivityIndicator />}
		</BottomSheetScrollViewModal>
	)
}
