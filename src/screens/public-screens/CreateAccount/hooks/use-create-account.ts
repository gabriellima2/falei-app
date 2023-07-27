import { createUserWithEmailAndPassword } from "firebase/auth";

import { useToastContext } from "@/contexts/ToastContext";
import { firebaseAuth } from "@/helpers/firebase-auth";

import type { UserAuthRequestDTO } from "@/dtos";

type UseCreateAccountReturn = {
	handleSignUp: (credentials: UserAuthRequestDTO) => Promise<void>;
};

export function useCreateAccount(): UseCreateAccountReturn {
	const { notify } = useToastContext();
	const handleSignUp = async (credentials: UserAuthRequestDTO) => {
		await createUserWithEmailAndPassword(
			firebaseAuth,
			credentials.email,
			credentials.password
		);
		notify("Conta criada com sucesso", { type: "success" });
	};
	return { handleSignUp };
}
