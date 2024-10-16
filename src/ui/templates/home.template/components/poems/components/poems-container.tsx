import { useCallback } from 'react'
import { ActivityIndicator, type ListRenderItemInfo } from 'react-native'

import { HorizontalList } from '@/ui/components/horizontal-list'
import { EmptyMessage } from '@/ui/atoms/empty-message'
import { Poem } from '@/ui/components/poem'

import { usePoemsContext } from '../contexts/poems.context/hooks'
import { useGetAllPoems } from '@/hooks/http/use-get-all-poems'

import type { PoemEntity } from '@/entities/poem.entity'

export function PoemsContainer() {
	const { poems, isLoading, isFetching } = useGetAllPoems()
	const { handleOpenReadPoemBottomSheet } = usePoemsContext()

	const keyExtractor = useCallback((item: PoemEntity) => item.id, [])

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<PoemEntity>) => (
			<Poem
				id={item.id}
				body={item.body}
				onPress={handleOpenReadPoemBottomSheet}
			/>
		),
		[handleOpenReadPoemBottomSheet],
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
