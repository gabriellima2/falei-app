import {
	View,
	TouchableOpacity,
	type ViewProps,
	type TouchableOpacityProps,
} from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import type { LucideProps } from 'lucide-react-native'

import { Typography } from '../atoms/typography'
import { colors } from '@/styles/theme'
import { cn } from '@/helpers/cn'

type DefaultVariants = {
	variant: {
		default: string
		primary: string
		success: string
		warning: string
		danger: string
		info: string
	}
}


const optionVariants = cva<DefaultVariants>(
	'w-9 h-9 items-center justify-center rounded-lg mr-4',
	{
		variants: {
			variant: {
				default: 'bg-layout-divider',
				primary: 'bg-base-primary-foreground',
				success: 'bg-base-success-foreground',
				warning: 'bg-base-warning-foreground',
				danger: 'bg-base-danger-foreground',
				info: 'bg-base-info-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

type OptionProps = VariantProps<typeof optionVariants> &
	Omit<TouchableOpacityProps, 'activeOpacity'> & {
		label?: string
		renderIcon?: (props: LucideProps) => JSX.Element
	}

const ICON_COLORS: Pick<DefaultVariants, 'variant'>['variant'] = {
	default: colors.base.text,
	danger: colors.base.danger,
	info: colors.base.info,
	primary: colors.base.primary,
	success: colors.base.success,
	warning: colors.base.warning
}

function Option(props: OptionProps) {
	const { variant, label, renderIcon, ...rest } = props
	const iconColor = ICON_COLORS[variant || 'default']
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className="flex-row items-center"
			{...rest}
		>
			<View
				className={cn(
					optionVariants({ variant, className: 'flex-row items-center' }),
				)}
			>
				{renderIcon && renderIcon({ size: 24, color: iconColor })}
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
	return <View className="rounded-xl bg-layout-foreground" {...props} />
}

export const MenuOptions = {
	Option,
	Content,
	Divider,
	Root,
}
