import { useCallback, useRef, useState, type PropsWithChildren } from 'react'

import { ReadPoemBottomSheet } from '../../components/read-poem-bottom-sheet'
import { PoemsContext } from './poems.context'

import type { BottomSheetModalElementRef } from '@/@types/general'

export function PoemsProvider(props: PropsWithChildren) {
	const readPoemBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const [poemId, setPoemId] = useState<string | null>(null)

	const handleReadPoem = useCallback(
		(id: string | null) => {
			readPoemBottomSheetRef.current?.present()
			setPoemId(id)
		},
		[],
	)

	return (
		<PoemsContext.Provider
			value={{
				poemId,
				readPoemBottomSheetRef,

				handleReadPoem,
			}}
		>
			<ReadPoemBottomSheet />
			{props.children}
		</PoemsContext.Provider>
	)
}
