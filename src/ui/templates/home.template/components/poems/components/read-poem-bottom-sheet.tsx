import { ActivityIndicator } from 'react-native'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { PoemStanzas } from '@/ui/components/poem-stanzas'
import { AuthorName } from '@/ui/atoms/author-name'
import { Typography } from '@/ui/atoms/typography'

import { useGetPoemById } from '@/hooks/queries/use-get-poem-by-id'
import { usePoemsContext } from '../contexts/poems.context/hooks'

export function ReadPoemBottomSheet() {
	const { poemId, readPoemBottomSheetRef } = usePoemsContext()
	const { poem, isLoading } = useGetPoemById(poemId)
	return (
		<BottomSheetScrollViewModal ref={readPoemBottomSheetRef}>
			{poem && (
				<>
					<Typography.Title>{poem.title}</Typography.Title>
					<AuthorName name={poem.authorName} className="mt-1" />
					<PoemStanzas poemText={poem.body} />
				</>
			)}
			{!poem && isLoading && <ActivityIndicator />}
		</BottomSheetScrollViewModal>
	)
}
