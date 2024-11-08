import { forwardRef, useState } from 'react'
import { TextInput, TouchableWithoutFeedback, View, type TextInputProps } from 'react-native'
import { Eye, EyeOff } from 'lucide-react-native'

import { colors } from '@/styles/theme'
import { cn } from '@/helpers/cn'

type PasswordProps = TextInputProps & {
	disabled?: boolean
}

export const Password = forwardRef<TextInput, PasswordProps>((props, ref) => {
	const { disabled = false, style, ...rest } = props
	const [isVisible, setIsVisible] = useState(false)
	return (
		<View
			className={cn(
				'w-full h-12 px-3 flex-row justify-between items-center bg-layout-foreground rounded-xl',
				{ 'opacity-50': disabled },
			)}
			style={style}
		>
			<TextInput
				ref={ref}
				aria-disabled={disabled}
				contextMenuHidden={disabled}
				editable={!disabled}
				secureTextEntry={!isVisible}
				autoCapitalize="none"
				keyboardAppearance="dark"
				placeholderTextColor={colors.base['text-muted']}
				className="flex-1 text-sm h-full text-common-white font-body mr-4"
				{...rest}
			/>
			<TouchableWithoutFeedback
				accessibilityLabel={isVisible ? 'Esconder senha' : 'Mostrar senha'}
				onPress={() => setIsVisible((prevState) => !prevState)}
			>
				{isVisible ? (
					<EyeOff size={20} color={colors.base.text} />
				) : (
					<Eye size={20} color={colors.base.text} />
				)}
			</TouchableWithoutFeedback>
		</View>
	)
})
