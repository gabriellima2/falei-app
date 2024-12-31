import { useCallback } from 'react'
import { FlatList, View, type FlatListProps } from 'react-native'

type HorizontalListProps<T> = Omit<
	FlatListProps<T>,
	'horizontal' | 'showsHorizontalScrollIndicator'
>

export function HorizontalList<T extends object>(props: HorizontalListProps<T>) {
	const { ItemSeparatorComponent, ...rest } = props

	const renderItemSeparatorComponent = useCallback(
		() => <View className="w-4" />,
		[],
	)

	return (
		<FlatList<T>
			horizontal
			showsHorizontalScrollIndicator={false}
			ItemSeparatorComponent={
				ItemSeparatorComponent
					? ItemSeparatorComponent
					: renderItemSeparatorComponent
			}
			{...rest}
		/>
	)
}
