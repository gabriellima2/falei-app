import { forwardRef } from 'react'
import { TextInput, type TextInputProps } from 'react-native'

import { colors } from '@/styles/theme'
import { cn } from '@/helpers/cn'

type DefaultProps = TextInputProps & {
	disabled?: boolean
}

export const Default = forwardRef<TextInput, DefaultProps>((props, ref) => {
	const { disabled = false, ...rest } = props
	return (
		<TextInput
			ref={ref}
			aria-disabled={disabled}
			autoCapitalize="none"
			keyboardAppearance="dark"
			placeholderTextColor={colors.base['text-muted']}
			contextMenuHidden={disabled}
			editable={!disabled}
			className={cn(
				'w-full h-12 px-3 bg-layout-foreground rounded-xl text-sm text-common-white font-body',
				{ 'opacity-50': disabled },
			)}
			{...rest}
		/>
	)
})
