import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { firebaseAuth } from "@/helpers/firebase-auth";
import type { AuthInputDTO } from "@/dtos/auth.dto";

export class FirebaseAuthenticatorService {
	async signIn(credentials: AuthInputDTO) {
		const { email, password } = credentials;
		return await signInWithEmailAndPassword(firebaseAuth, email, password);
	}
	async signUp(credentials: AuthInputDTO) {
		const { email, password } = credentials;
		return await createUserWithEmailAndPassword(firebaseAuth, email, password);
	}
}
