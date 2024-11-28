import { useCallback, useRef, useState, type PropsWithChildren } from 'react'

import { ReadTongueTwisterBottomSheet } from '../../components/read-tongue-twister-bottom-sheet'
import { TonguesTwisterContext } from './tongues-twister.context'

import type { BottomSheetModalElementRef } from '@/@types/general'

export function TonguesTwisterProvider(props: PropsWithChildren) {
	const readTongueTwisterBottomSheetRef = useRef<BottomSheetModalElementRef>(null)
	const [tongueTwisterId, setTongueTwisterId] = useState<string | null>(null)

	const handleReadTongueTwister = useCallback(
		(id: string | null) => {
			readTongueTwisterBottomSheetRef.current?.present()
			setTongueTwisterId(id)
		},
		[],
	)

	return (
		<TonguesTwisterContext.Provider
			value={{
				tongueTwisterId,
				readTongueTwisterBottomSheetRef,

				handleReadTongueTwister,
			}}
		>
			<ReadTongueTwisterBottomSheet />
			{props.children}
		</TonguesTwisterContext.Provider>
	)
}
