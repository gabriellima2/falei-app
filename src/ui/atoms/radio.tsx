import { createContext, useCallback, useContext, useState } from 'react'
import { TouchableOpacity, View, type ViewProps } from 'react-native'

import { Typography } from './typography'

import { ContextWithoutProviderException } from '@/exceptions/context-without-provider-exception'
import { cn } from '@/helpers/cn'

type RadioContextValues = {
	value?: string | number
	onValueChange?: (value: string | number) => void
}

const RadioContext = createContext<RadioContextValues>({} as RadioContextValues)

function useRadioContext() {
	const context = useContext(RadioContext)
	if (!context) {
		throw new ContextWithoutProviderException('RadioContext', 'Group')
	}
	return context
}

type GroupProps = ViewProps & RadioContextValues

function Group(props: GroupProps) {
	const { value, onValueChange, ...rest } = props

	return (
		<RadioContext.Provider
			value={{
				value,
				onValueChange,
			}}
		>
			<View className="flex-row flex-wrap gap-x-4" {...rest} />
		</RadioContext.Provider>
	)
}

type ItemProps = {
	label?: string
	value: string | number
	className?: string
	classNameLabel?: string
}

function Item(props: ItemProps) {
	const { value, onValueChange } = useRadioContext()
	const { label, classNameLabel, value: itemValue, ...rest } = props

	const isSelected = itemValue === value

	const handleOnPress = useCallback(() => {
		onValueChange && onValueChange(itemValue)
	}, [itemValue, onValueChange])

	return (
		<TouchableOpacity
			role="radio"
			activeOpacity={0.8}
			onPress={handleOnPress}
			aria-checked={isSelected}
			accessibilityState={{ checked: isSelected }}
			className={cn(
				'bg-base-primary-foreground min-w-[64px] max-w-[70px] h-10 items-center justify-center rounded-xl mt-4 flex-1',
				{ 'bg-base-primary': isSelected },
			)}
			{...rest}
		>
			<Typography.Label
				className={cn(classNameLabel, { 'text-base-text-foreground': isSelected })}
			>
				{label}
			</Typography.Label>
		</TouchableOpacity>
	)
}

export const Radio = {
	Group,
	Item
}
