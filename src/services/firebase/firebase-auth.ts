import { UserAuthRequestDTO } from "@/dtos";
import { firebaseAuth } from "@/helpers/firebase-auth";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

export async function firebaseSignIn(user: UserAuthRequestDTO) {
	return await signInWithEmailAndPassword(
		firebaseAuth,
		user.email,
		user.password
	);
}

export async function firebaseSignUp(user: UserAuthRequestDTO) {
	return await createUserWithEmailAndPassword(
		firebaseAuth,
		user.email,
		user.password
	);
}
