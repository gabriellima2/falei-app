import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";

import { firebaseAuth } from "@/helpers/firebase-auth";
import type { UserAuthRequestDTO } from "@/dtos";

type UseLoginReturn = {
	handleSignIn: (credentials: UserAuthRequestDTO) => Promise<void>;
};

export function useLogin(): UseLoginReturn {
	const router = useRouter();
	const handleSignIn = async (credentials: UserAuthRequestDTO) => {
		await signInWithEmailAndPassword(
			firebaseAuth,
			credentials.email,
			credentials.password
		);
		router.replace("(tabs)/");
	};
	return { handleSignIn };
}
