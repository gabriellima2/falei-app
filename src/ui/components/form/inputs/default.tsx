import { forwardRef } from 'react'
import { TextInput, type TextInputProps } from 'react-native'

import { colors } from '@/styles/theme'

export const Default = forwardRef<TextInput, TextInputProps>((props, ref) => {
	return (
		<TextInput
			ref={ref}
			autoCapitalize="none"
			keyboardAppearance="dark"
			placeholderTextColor={colors.base['text-muted']}
			className="w-full h-12 px-3 bg-layout-foreground rounded-xl text-sm text-common-white font-body"
			{...props}
		/>
	)
})
