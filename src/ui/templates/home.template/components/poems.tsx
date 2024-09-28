import { useCallback } from 'react'
import type { ListRenderItemInfo } from 'react-native'

import { HorizontalList } from '@/ui/components/horizontal-list'
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

	return (
		<HorizontalList
			data={poems}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
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
