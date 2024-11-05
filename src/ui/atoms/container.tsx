import { View, type ViewProps } from 'react-native'

export function Container(props: ViewProps) {
	return <View className="flex-1 px-4 pb-4" {...props} />
}
