import { TouchableOpacity, Text } from "react-native";
import { useToastContext, type ToastConfig } from "@/contexts/ToastContext";

export const ShowToastButton = (props: ToastConfig) => {
	const { notify } = useToastContext();
	return (
		<TouchableOpacity onPress={() => notify(props.message, props.options)}>
			<Text>Show</Text>
		</TouchableOpacity>
	);
};
