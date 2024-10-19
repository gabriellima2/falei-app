import { useCallback } from 'react'
import { ActivityIndicator, type ListRenderItemInfo } from 'react-native'

import { HorizontalList } from '@/ui/components/horizontal-list'
import { EmptyMessage } from '@/ui/atoms/empty-message'
import { Poem } from '@/ui/components/poem'

import { useGetAllPoems } from '@/hooks/queries/use-get-all-poems'
import { usePoemsContext } from '../contexts/poems.context/hooks'

import type { PoemEntity } from '@/entities/poem.entity'

export function PoemsContainer() {
	const { poems, isLoading, isFetching } = useGetAllPoems()
	const { handleReadPoem } = usePoemsContext()

	const keyExtractor = useCallback((item: PoemEntity) => item.id, [])

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<PoemEntity>) => (
			<Poem
				id={item.id}
				body={item.body}
				onPress={handleReadPoem}
			/>
		),
		[handleReadPoem],
	)

	return (
		<HorizontalList
			data={poems}
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
