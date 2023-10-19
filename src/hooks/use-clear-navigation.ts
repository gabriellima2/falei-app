import { useNavigation } from "expo-router";

export function useClearNavigation(routesToClean: string[]): () => void {
	const navigation = useNavigation();

	const clear = () => {
		const state = navigation.getState();
		navigation.reset({
			...state,
			routes: state.routes.filter(
				(route) => !routesToClean.includes(route.name)
			),
			index: 0,
		});
	};

	return clear;
}
