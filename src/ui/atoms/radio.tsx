import { createContext, useCallback, useContext, useState } from 'react'
import { TouchableOpacity, View, type ViewProps } from 'react-native'

import { Typography } from './typography'

import { ContextWithoutProviderException } from '@/exceptions/context-without-provider-exception'
import { cn } from '@/helpers/cn'

type RadioContextValues = {
	currentValue?: string | number
	onCurrentValueChange: (value: string | number) => void
}

const RadioContext = createContext<RadioContextValues>({} as RadioContextValues)

function useRadioContext() {
	const context = useContext(RadioContext)
	if (!context) {
		throw new ContextWithoutProviderException('RadioContext', 'Group')
	}
	return context
}

type GroupProps = ViewProps & {
	defaultValue?: string | number
	onValueChange?: (value?: string | number) => void
}

function Group(props: GroupProps) {
	const { defaultValue, onValueChange, ...rest } = props
	const [currentValue, setCurrentValue] = useState(defaultValue)

	const handleSetCurrentValue = useCallback(
		(_value: string | number) => {
			if (_value === currentValue) return
			setCurrentValue(_value)
			onValueChange && onValueChange(_value)
		},
		[currentValue, onValueChange],
	)

	return (
		<RadioContext.Provider
			value={{
				currentValue,
				onCurrentValueChange: handleSetCurrentValue,
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
	const { currentValue, onCurrentValueChange } = useRadioContext()
	const { label, classNameLabel, value, ...rest } = props

	const hasCurrentValue = typeof currentValue !== 'undefined'
	const isSelected = hasCurrentValue && value === currentValue

	const handleOnPress = useCallback(() => {
		onCurrentValueChange(value)
	}, [value, onCurrentValueChange])

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
