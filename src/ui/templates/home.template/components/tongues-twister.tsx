import { useCallback } from 'react'
import type { ListRenderItemInfo } from 'react-native'

import { HorizontalList } from '@/ui/components/horizontal-list'
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

	return (
		<HorizontalList
			data={tonguesTwister}
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
