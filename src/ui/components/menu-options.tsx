import {
	View,
	TouchableOpacity,
	type ViewProps,
	type TouchableOpacityProps,
} from 'react-native'
import type { LucideProps } from 'lucide-react-native'

import { Typography } from '../atoms/typography'

type OptionProps = Omit<TouchableOpacityProps, 'activeOpacity'> & {
	label?: string
	renderIcon?: (props: LucideProps) => JSX.Element
}

function Option(props: OptionProps) {
	const { label, renderIcon, ...rest } = props
	return (
		<TouchableOpacity activeOpacity={0.8} className="flex-row items-center" {...rest}>
			<View className="w-9 h-9 bg-base-primary-foreground items-center justify-center rounded-lg mr-4">
				{renderIcon && renderIcon({ size: 24 })}
			</View>
			<Typography.Label>{label}</Typography.Label>
		</TouchableOpacity>
	)
}

function Content(props: ViewProps) {
	return <View className="gap-4" {...props} />
}

function Divider() {
	return <View className="w-2/3 h-[2px] mt-3 -mb-1 rounded bg-layout-divider self-center"/>
}

function Root(props: ViewProps) {
	return <View className="p-4 rounded-xl bg-layout-foreground" {...props} />
}

export const MenuOptions = {
	Option,
	Content,
	Divider,
	Root,
}
