import { useMemo } from 'react'
import { View } from 'react-native'

import { Paragraphs } from './paragraphs'
import { getPoemStanzas } from '@/helpers/general'

type PoemStanzasProps = {
	poemText: string
}

export function PoemStanzas(props: PoemStanzasProps) {
	const { poemText } = props

	const poemStanzas = useMemo(() => {
		return getPoemStanzas(poemText)
	}, [poemText])

	return (
		<>
			{poemStanzas.map((stanza, index) => (
				<View key={index} className="mt-4">
					<Paragraphs paragraphs={stanza} />
				</View>
			))}
		</>
	)
}
