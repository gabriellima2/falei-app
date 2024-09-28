import { useCallback } from 'react'
import { FlatList, View, type ListRenderItemInfo } from 'react-native'

import { TongueTwister } from '@/ui/components/tongue-twister'
import { Typography } from '@/ui/atoms/typography'

import { useGetAllTonguesTwister } from '@/hooks/http/use-get-all-tongues-twister'

import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'

export function TonguesTwister() {
	const { tonguesTwister, isLoading, isFetching } = useGetAllTonguesTwister()

	const keyExtractor = useCallback((item: TongueTwisterEntity) => item.id, [])

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<TongueTwisterEntity>) => (
			<TongueTwister
				id={item.id}
				body={item.body}
			/>
		),
		[],
	)

	const renderItemSeparatorComponent = useCallback(() => <View className="w-4" />, [])

	return (
		<FlatList
			data={tonguesTwister}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			horizontal
			showsHorizontalScrollIndicator={false}
			ItemSeparatorComponent={renderItemSeparatorComponent}
			ListEmptyComponent={() => (
				<>
					{isLoading || isFetching ? (
						<Typography.Label>Loading...</Typography.Label>
					) : (
						<Typography.Label>Empty...</Typography.Label>
					)}
				</>
			)}
		/>
	)
}
