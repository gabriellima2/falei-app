import { forwardRef } from 'react'
import {
	TouchableOpacity,
	ActivityIndicator,
	type TouchableOpacityProps,
} from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'

import { Typography } from '../typography'
import { cn } from '@/helpers/cn'
import { colors } from '@/styles/theme'

const variants = cva('w-full items-center justify-center rounded-xl', {
	variants: {
		variant: {
			default: 'bg-base-primary',
			secondary: 'bg-layout-foreground',
			outline: 'bg-none border-2 border-base-primary',
			destructive: 'bg-base-danger',
			text: 'bg-none',
			'destructive-text': 'bg-none',
		},
		size: {
			default: 'h-12 p-3',
			icon: 'h-11 w-11',
		},
		'not-allowed': {
			true: 'opacity-50',
			false: 'opacity-100',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
		'not-allowed': false,
	},
})

type ButtonProps = Omit<TouchableOpacityProps, 'activeOpacity'> &
	Omit<VariantProps<typeof variants>, 'not-allowed'> & {
		label?: string
		isLoading?: boolean
	}

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
	(props, ref) => {
		const {
			variant,
			size,
			children,
			label,
			isLoading,
			disabled,
			onPress,
			...rest
		} = props

		const shouldRenderLabel = !isLoading && !children && !!label
		const shouldRenderChildren = !isLoading && !label && !!children

		const shouldRenderWhiteText = variant === 'outline' || variant === 'text' || variant === 'secondary'
		const shouldRenderRedText = variant === 'destructive-text'

		const notAllowed = isLoading || disabled

		return (
			<TouchableOpacity
				className={cn(
					variants({
						variant,
						size,
						'not-allowed': notAllowed,
					}),
				)}
				ref={ref}
				disabled={disabled}
				activeOpacity={notAllowed ? 0.5 : 0.8}
				onPress={notAllowed ? undefined : onPress}
				{...rest}
			>
				{isLoading && (
					<ActivityIndicator color={shouldRenderWhiteText ? colors.base.text : colors.layout.background} />
				)}
				{shouldRenderLabel && (
					<Typography.Label
						className={cn('text-base-text-foreground', {
							'text-base-text': shouldRenderWhiteText,
							'text-base-danger': shouldRenderRedText,
						})}
					>
						{label}
					</Typography.Label>
				)}
				{shouldRenderChildren && children}
			</TouchableOpacity>
		)
	},
)

Button.displayName = 'Button'
