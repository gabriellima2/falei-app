import { useCallback } from 'react'
import { FlatList, View, type FlatListProps } from 'react-native'

type VerticalListProps<T> = Omit<
	FlatListProps<T>,
	'horizontal' | 'showsHorizontalScrollIndicator'
>

export function VerticalList<T extends object>(props: VerticalListProps<T>) {
	const { ItemSeparatorComponent, contentContainerStyle, ...rest } = props

	const renderItemSeparatorComponent = useCallback(
		() => <View className="h-4" />,
		[],
	)

	return (
		<FlatList<T>
			contentContainerStyle={[{ paddingHorizontal: 16 }, contentContainerStyle]}
			ItemSeparatorComponent={
				ItemSeparatorComponent
					? ItemSeparatorComponent
					: renderItemSeparatorComponent
			}
			{...rest}
		/>
	)
}
