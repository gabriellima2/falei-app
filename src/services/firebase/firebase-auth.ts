import { UserAuthInputDTO } from "@/dtos";
import { firebaseAuth } from "@/helpers/firebase-auth";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

export async function firebaseSignIn(user: UserAuthInputDTO) {
	return await signInWithEmailAndPassword(
		firebaseAuth,
		user.email,
		user.password
	);
}

export async function firebaseSignUp(user: UserAuthInputDTO) {
	return await createUserWithEmailAndPassword(
		firebaseAuth,
		user.email,
		user.password
	);
}
