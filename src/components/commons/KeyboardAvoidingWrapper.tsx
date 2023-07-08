import { type ReactNode } from "react";
import {
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

type KeyboardAvoidingWrapperProps = {
	children: ReactNode;
};

export const KeyboardAvoidingWrapper = (
	props: KeyboardAvoidingWrapperProps
) => {
	const { children } = props;
	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					{children}
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
