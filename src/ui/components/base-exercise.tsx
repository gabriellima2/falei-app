import { createContext, useContext, type PropsWithChildren } from 'react'
import {
	View,
	TouchableOpacity,
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

const rootVariants = cva<DefaultVariants>(
	'w-[164px] rounded-xl overflow-hidden',
	{
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
	},
)

type BaseExerciseContextValues = VariantProps<typeof rootVariants> & {
	onMenuPress?: () => void
}

const BaseExerciseContext = createContext({} as BaseExerciseContextValues)

function useBaseExerciseContext() {
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
	const { children, variant, onPress, onMenuPress, ...rest } = props
	return (
		<BaseExerciseContext.Provider value={{ variant, onMenuPress }}>
			<TouchableOpacity
				onPress={onPress}
				activeOpacity={0.9}
				className={cn(
					rootVariants({
						variant,
					}),
				)}
				{...rest}
			>
				{children}
			</TouchableOpacity>
		</BaseExerciseContext.Provider>
	)
}

function Header(props: ViewProps) {
	return (
		<View className="flex-row justify-between items-center pr-4" {...props} />
	)
}

function Content(props: ViewProps) {
	return <View className="px-4 pb-4 justify-between" {...props} />
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
	const { renderIcon, ...rest } = props
	const { variant } = useBaseExerciseContext()
	const iconColor = ICON_COLORS[variant || 'default']
	return (
		<View
			className={cn(
				'p-4 rounded-full -translate-y-1.5 -translate-x-1.5 w-16 h-16 justify-center items-center',
				foregroundVariants({
					variant,
				}),
			)}
			{...rest}
		>
			{renderIcon({ color: iconColor, size: 24 })}
		</View>
	)
}

function Title(props: TextProps) {
	return <Typography.Title numberOfLines={2} className="text-base" {...props} />
}

function Paragraph(props: TextProps) {
	return (
		<Typography.Paragraph
			numberOfLines={4}
			ellipsizeMode="tail"
			className="text-base"
			{...props}
		/>
	)
}

function Menu() {
	const { onMenuPress } = useBaseExerciseContext()
	return (
		<TouchableOpacity onPress={onMenuPress} activeOpacity={0.8} hitSlop={10}>
			<EllipsisVertical color={colors.white} />
		</TouchableOpacity>
	)
}

function InformationRoot(props: ViewProps) {
	return <View className="mt-2" {...props} />
}

type InformationProps = {
	text?: string
	className?: string
}

function InformationItem(props: InformationProps) {
	const { text, ...rest } = props
	const { variant } = useBaseExerciseContext()
	return (
		<View
			className={cn(
				'w-full max-w-[95px] mt-2 h-[32px] px-2 rounded-lg items-center justify-center',
				foregroundVariants({
					variant,
				}),
			)}
			{...rest}
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
	Paragraph,
	InformationRoot,
	InformationItem,
}
