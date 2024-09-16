import { View, type ViewProps } from 'react-native'
import { cn } from '@/helpers/cn'

type ContainerProps = ViewProps

export function Container(props: ContainerProps) {
	const { className, ...rest } = props
	return <View className={cn('flex-1 p-4', className)} {...rest} />
}
