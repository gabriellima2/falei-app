import { useCallback, useRef, useState, type PropsWithChildren } from 'react'

import { ReadPoemBottomSheet } from '../../components/read-poem-bottom-sheet'
import { PoemsContext } from './poems.context'

import type { BottomSheetModalElementRef } from '@/@types/general'

export function PoemsProvider(props: PropsWithChildren) {
	const readPoemBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const [poemId, setPoemId] = useState<string | null>(null)

	const handleOpenReadPoemBottomSheet = useCallback(
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

				handleOpenReadPoemBottomSheet,
			}}
		>
			<ReadPoemBottomSheet />
			{props.children}
		</PoemsContext.Provider>
	)
}
