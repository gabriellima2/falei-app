import { useCallback } from 'react'
import { FlatList, View, type ListRenderItemInfo } from 'react-native'

import { Typography } from '@/ui/atoms/typography'
import { Poem } from '@/ui/components/poem'

import { useGetAllPoems } from '@/hooks/http/use-get-all-poems'

import type { PoemEntity } from '@/entities/poem.entity'

export function Poems() {
	const { poems, isLoading, isFetching } = useGetAllPoems()

	const keyExtractor = useCallback((item: PoemEntity) => item.id, [])

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<PoemEntity>) => (
			<Poem
				id={item.id}
				body={item.body}
			/>
		),
		[],
	)

	const renderItemSeparatorComponent = useCallback(() => <View className="w-4" />, [])

	return (
		<FlatList
			data={poems}
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
