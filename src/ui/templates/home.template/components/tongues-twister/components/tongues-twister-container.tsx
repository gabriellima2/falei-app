import { useCallback } from 'react'
import { ActivityIndicator, type ListRenderItemInfo } from 'react-native'

import { HorizontalList } from '@/ui/components/horizontal-list'
import { TongueTwister } from '@/ui/components/tongue-twister'
import { EmptyMessage } from '@/ui/atoms/empty-message'

import { useTonguesTwisterContext } from '../contexts/tongues-twister.context/hooks'
import { useGetAllTonguesTwister } from '@/hooks/http/use-get-all-tongues-twister'

import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'

export function TonguesTwisterContainer() {
	const { tonguesTwister, isLoading, isFetching } = useGetAllTonguesTwister()
	const { handleReadTongueTwister } = useTonguesTwisterContext()

	const keyExtractor = useCallback((item: TongueTwisterEntity) => item.id, [])

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<TongueTwisterEntity>) => (
			<TongueTwister
				id={item.id}
				body={item.body}
				onPress={handleReadTongueTwister}
			/>
		),
		[handleReadTongueTwister],
	)

	return (
		<HorizontalList
			data={tonguesTwister}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			ListEmptyComponent={() => (
				<>
					{isLoading || isFetching ? (
						<ActivityIndicator />
					) : (
						<EmptyMessage />
					)}
				</>
			)}
		/>
	)
}
