import { useRouter } from "expo-router";
import { useClearNavigation } from "./use-clear-navigation";

export function useRedirectAfterAuthentication() {
	const clearNavigation = useClearNavigation([
		"(auth)/create-account",
		"(auth)/login",
	]);
	const router = useRouter();

	const redirect = () => {
		clearNavigation();
		router.replace("(tabs)/");
	};

	return { redirect };
}
