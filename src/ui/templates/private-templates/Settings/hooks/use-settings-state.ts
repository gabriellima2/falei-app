import { useToastContext } from "@/contexts/ToastContext";
import { useAuthStore } from "@/store/auth-store";

export function useSettingsState() {
	const { signOut } = useAuthStore((state) => state);
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
