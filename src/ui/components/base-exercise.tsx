import { createContext, useContext, type PropsWithChildren } from 'react'
import {
	View,
	TouchableHighlight,
	type TextProps,
	type ViewProps,
	TouchableOpacity,
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
			default: 'bg-layout-foreground',
			'breathing-exercise': 'bg-entity-breathing-exercise-background',
			goal: 'bg-entity-goal-background',
			poem: 'bg-entity-poem-background',
			'tongue-twister': 'bg-entity-tongue-twister-background',
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
		onPress?: () => void
	}

function Root(props: RootProps) {
	const { className, children, variant, onPress, onMenuPress } = props
	return (
		<BaseExerciseContext.Provider value={{ variant, onMenuPress }}>
			<TouchableOpacity
				onPress={onPress}
				activeOpacity={0.9}
				className={cn(
					'w-full max-w-[164px] rounded-xl overflow-hidden',
					rootVariants({
						variant,
						className,
					}),
				)}
			>
				{children}
			</TouchableOpacity>
		</BaseExerciseContext.Provider>
	)
}

function Header(props: ViewProps) {
	const { className, ...rest } = props
	return (
		<View
			className={cn('flex-row justify-between items-center pr-4', className)}
			{...rest}
		/>
	)
}

function Content(props: ViewProps) {
	const { className, ...rest } = props
	return <View className={cn('p-4', className)} {...rest} />
}

const foregroundVariants = cva<DefaultVariants>('', {
	variants: {
		variant: {
			default: 'bg-common-white/5',
			'breathing-exercise': 'bg-entity-breathing-exercise/5',
			goal: 'bg-entity-goal/5',
			poem: 'bg-entity-poem/5',
			'tongue-twister': 'bg-entity-tongue-twister/5',
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
	default: '#F6F7F7',
	'breathing-exercise': '#73CEF2',
	goal: '#DD9EF3',
	poem: '#73F299',
	'tongue-twister': '#73F299',
}

function Icon(props: IconProps) {
	const { className, renderIcon } = props
	const { variant } = useBaseExerciseContext()
	const iconColor = ICON_COLORS[variant || 'default']
	return (
		<View
			className={cn(
				'p-4 rounded-full -translate-y-2 -translate-x-2 w-16 h-16 justify-center items-center',
				foregroundVariants({
					variant,
					className,
				}),
			)}
		>
			{renderIcon({ color: iconColor, size: 24 })}
		</View>
	)
}

function Title(props: TextProps) {
	const { className, ...rest } = props
	return <Typography.Title className={cn('text-base', className)} {...rest} />
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
	return <View className={cn('mt-2', className)} {...rest} />
}

type InformationProps = {
	text?: string
	className?: string
}

function InformationItem(props: InformationProps) {
	const { className, text } = props
	const { variant } = useBaseExerciseContext()
	return (
		<View
			className={cn(
				'w-full max-w-[95px] mt-2 py-3 px-2 rounded-lg items-center justify-center',
				foregroundVariants({
					variant,
					className,
				}),
			)}
		>
			<Typography.Paragraph
				ellipsizeMode="tail"
				className="text-xs text-center"
			>
				{text}
			</Typography.Paragraph>
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
