import { useToastContext } from "@/contexts/ToastContext";
import { useAuthenticationStore } from "@/store/authentication-store";

export function useSettingsState() {
	const { signOut } = useAuthenticationStore((state) => state);
	const { notify } = useToastContext();

	const handleLogout = async () => {
		try {
			await signOut();
		} catch (err) {
			notify(
				"Desculpe, encontramos um problema ao tentar encerrar sua sessão",
				{ type: "alert" }
			);
		}
	};

	return { handleLogout };
}
