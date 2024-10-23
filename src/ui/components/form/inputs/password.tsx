import { forwardRef, useState } from 'react'
import { TextInput, TouchableWithoutFeedback, View, type TextInputProps } from 'react-native'
import { Eye, EyeOff } from 'lucide-react-native'

import { colors } from '@/styles/theme'

export const Password = forwardRef<TextInput, TextInputProps>((props, ref) => {
	const [isVisible, setIsVisible] = useState(false)
	return (
		<View className="w-full h-12 px-3 flex-row justify-between items-center bg-layout-foreground rounded-xl">
			<TextInput
				ref={ref}
				secureTextEntry={!isVisible}
				className="flex-1 text-sm text-common-white font-body mr-4"
				{...props}
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
