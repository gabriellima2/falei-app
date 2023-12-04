import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { firebaseAuth } from "@/helpers/firebase-auth";
import type { AuthInputDTO } from "@/dtos/auth.dto";

export async function firebaseSignIn(user: AuthInputDTO) {
	return await signInWithEmailAndPassword(
		firebaseAuth,
		user.email,
		user.password
	);
}

export async function firebaseSignUp(user: AuthInputDTO) {
	return await createUserWithEmailAndPassword(
		firebaseAuth,
		user.email,
		user.password
	);
}
