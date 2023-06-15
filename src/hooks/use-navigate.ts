import { useNavigation as useReactNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

export const useNavigation = <StackParams extends {}>() => {
	const { navigate, goBack } =
		useReactNavigation<StackNavigationProp<StackParams>>();
	return { navigate, goBack };
};
