import { useMemo } from 'react'
import { View } from 'react-native'

import { usePoemsContext } from '../contexts/poems.context/hooks'
import { useGetPoemById } from '@/hooks/http/use-get-poem-by-id'

import { BottomSheetScrollViewModal } from '@/ui/components/bottom-sheet/bottom-sheet-scroll-view-modal'
import { Typography } from '@/ui/atoms/typography'

import { getPoemStanzas } from '@/helpers/general'

export function ReadPoemBottomSheet() {
	const { poemId, readPoemBottomSheetRef } = usePoemsContext()
	const { poem } = useGetPoemById(poemId)

	const poemStanzas = useMemo(() => {
		if (!poem) return []
		return getPoemStanzas(poem.body)
	}, [poem])

	return (
		<BottomSheetScrollViewModal ref={readPoemBottomSheetRef}>
			<Typography.Title>
				{poem?.title}
			</Typography.Title>
			<Typography.Paragraph className="text-base-text-muted mt-1">
				Autor: {poem?.authorName || 'Não informado'}
			</Typography.Paragraph>
			{poemStanzas.map((stanza, index) => (
				<View key={index} className="mt-4">
					{stanza.map((verse, index) => (
						<Typography.Paragraph
							key={`${verse}-${index}`}
							className="text-base"
						>
							{verse.trim()}
						</Typography.Paragraph>
					))}
				</View>
			))}
		</BottomSheetScrollViewModal>
	)
}
