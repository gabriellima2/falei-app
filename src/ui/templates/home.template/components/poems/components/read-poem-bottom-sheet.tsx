import { ActivityIndicator } from 'react-native'

import { usePoemsContext } from '../contexts/poems.context/hooks'
import { useGetPoemById } from '@/hooks/http/use-get-poem-by-id'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { PoemStanzas } from '@/ui/components/poem-stanzas'
import { Typography } from '@/ui/atoms/typography'

export function ReadPoemBottomSheet() {
	const { poemId, readPoemBottomSheetRef } = usePoemsContext()
	const { poem, isLoading } = useGetPoemById(poemId)
	return (
		<BottomSheetScrollViewModal ref={readPoemBottomSheetRef}>
			{poem && (
				<>
					<Typography.Title>{poem.title}</Typography.Title>
					<Typography.Paragraph className="text-base-text-muted mt-1">
						Autor: {poem.authorName || 'Não informado'}
					</Typography.Paragraph>
					<PoemStanzas poemText={poem.body} />
				</>
			)}
			{!poem && isLoading && <ActivityIndicator />}
		</BottomSheetScrollViewModal>
	)
}
