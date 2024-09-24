import { createContext, useContext, type PropsWithChildren } from 'react'
import {
	View,
	TouchableHighlight,
	type TextProps,
	type ViewProps,
} from 'react-native'
import { EllipsisVertical, type LucideProps } from 'lucide-react-native'
import { cva, type VariantProps } from 'class-variance-authority'
import colors from 'tailwindcss/colors'

import { Typography } from '../atoms/typography'

import { ContextWithoutProviderException } from '@/exceptions/context-without-provider-exception'
import { cn } from '@/helpers/cn'

type DefaultVariants = {
	variant: {
		default: string
		'breathing-exercise': string
		goal: string
		poem: string
		'tongue-twister': string
	}
}

const rootVariants = cva<DefaultVariants>('', {
	variants: {
		variant: {
			default: '',
			'breathing-exercise': '',
			goal: '',
			poem: '',
			'tongue-twister': '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

type BaseExerciseContextValues = VariantProps<typeof rootVariants> & {
	onMenuPress?: () => void
}

const BaseExerciseContext = createContext({} as BaseExerciseContextValues)

export function useBaseExerciseContext() {
	const context = useContext(BaseExerciseContext)
	if (!context) {
		throw new ContextWithoutProviderException('BaseExerciseContext', 'Root')
	}
	return context
}

type RootProps = PropsWithChildren &
	Pick<BaseExerciseContextValues, 'onMenuPress' | 'variant'> & {
		className?: string
	}

function Root(props: RootProps) {
	const { className, children, variant, onMenuPress } = props
	return (
		<BaseExerciseContext.Provider value={{ variant, onMenuPress }}>
			<View className={cn('', className)}>{children}</View>
		</BaseExerciseContext.Provider>
	)
}

function Header(props: ViewProps) {
	const { className, ...rest } = props
	return <View className={cn('', className)} {...rest} />
}

function Content(props: ViewProps) {
	const { className, ...rest } = props
	return <View className={cn('', className)} {...rest} />
}

const foregroundVariants = cva<DefaultVariants>('', {
	variants: {
		variant: {
			default: '',
			'breathing-exercise': '',
			goal: '',
			poem: '',
			'tongue-twister': '',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

type IconProps = {
	className?: string
	renderIcon: (props: LucideProps) => JSX.Element
}

const ICON_COLORS: Pick<DefaultVariants, 'variant'>['variant'] = {
	default: '',
	'breathing-exercise': '',
	goal: '',
	poem: '',
	'tongue-twister': '',
}

function Icon(props: IconProps) {
	const { className, renderIcon } = props
	const { variant } = useBaseExerciseContext()
	const iconColor = ICON_COLORS[variant || 'default']
	return (
		<View
			className={cn(
				foregroundVariants({
					variant,
					className,
				}),
			)}
		>
			{renderIcon({ color: iconColor, size: 20 })}
		</View>
	)
}

function Title(props: TextProps) {
	const { className, ...rest } = props
	return <Typography.Title className={cn('text-sm', className)} {...rest} />
}

function Menu() {
	const { onMenuPress } = useBaseExerciseContext()
	return (
		<TouchableHighlight onPress={onMenuPress}>
			<EllipsisVertical color={colors.white} />
		</TouchableHighlight>
	)
}

function InformationRoot(props: ViewProps) {
	const { className, ...rest } = props
	const { variant } = useBaseExerciseContext()
	return (
		<View
			className={cn(
				foregroundVariants({
					variant,
					className,
				}),
			)}
			{...rest}
		/>
	)
}

type InformationProps = {
	text?: string
	className?: string
}

function InformationItem(props: InformationProps) {
	const { className, text } = props
	return (
		<View className={cn('text-xs', className)}>
			<Typography.Paragraph className="text-xs">{text}</Typography.Paragraph>
		</View>
	)
}

export const BaseExercise = {
	Root,
	Header,
	Icon,
	Menu,
	Content,
	Title,
	InformationRoot,
	InformationItem,
}
