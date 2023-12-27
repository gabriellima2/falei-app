import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { firebaseAuth } from "@/helpers/firebase-auth";

import type { FirebaseAuthenticatorService } from "../firebase-authenticator.service";
import type { AuthInputDTO, AuthOutputDTO } from "@/dtos/auth.dto";

export class FirebaseAuthenticatorServiceImpl
	implements FirebaseAuthenticatorService
{
	async signIn(credentials: AuthInputDTO): AuthOutputDTO {
		const { email, password } = credentials;
		return await signInWithEmailAndPassword(firebaseAuth, email, password);
	}
	async signUp(credentials: AuthInputDTO): AuthOutputDTO {
		const { email, password } = credentials;
		return await createUserWithEmailAndPassword(firebaseAuth, email, password);
	}
}
