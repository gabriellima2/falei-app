import { ScrollView, View, type ScrollViewProps } from 'react-native'

type ScrollContainerProps = ScrollViewProps

export function ScrollContainer(props: ScrollContainerProps) {
	const { contentContainerStyle, ...rest } = props
	return (
		<View className="flex-1">
			<ScrollView
				contentContainerStyle={[contentContainerStyle, { paddingLeft: 16 }]}
				{...rest}
			/>
		</View>
	)
}
