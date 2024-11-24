import { useMemo } from 'react'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Paragraphs } from '@/ui/components/paragraphs'
import { AuthorName } from '@/ui/atoms/author-name'
import { Skeleton } from '@/ui/atoms/skeleton'

import { useGetTongueTwisterById } from '@/hooks/queries/use-get-tongue-twister-by-id'
import { useTonguesTwisterContext } from '../contexts/tongues-twister.context/hooks'

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
					<AuthorName name={tongueTwister.authorName} className="mt-4" />
				</>
			)}
			{!hasTongueTwisterSentences && isLoading && (
				<Skeleton.ReadTongueTwister />
			)}
		</BottomSheetScrollViewModal>
	)
}
