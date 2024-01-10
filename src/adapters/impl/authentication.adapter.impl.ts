import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInAnonymously,
	sendPasswordResetEmail,
} from "firebase/auth";

import { firebaseAuth } from "@/lib/firebase-auth";

import type { AuthenticationAdapter } from "../authentication.adapter";
import type {
	AuthInputDTO,
	AuthOutputDTO,
	ResetPasswordInputDTO,
	ResetPasswordOutputDTO,
} from "@/dtos/auth.dto";

export class AuthenticationAdapterImpl implements AuthenticationAdapter {
	async signIn(credentials: AuthInputDTO): AuthOutputDTO {
		const { email, password } = credentials;
		return await signInWithEmailAndPassword(firebaseAuth, email, password);
	}
	async signUp(credentials: AuthInputDTO): AuthOutputDTO {
		const { email, password } = credentials;
		return await createUserWithEmailAndPassword(firebaseAuth, email, password);
	}
	async anonymous(): AuthOutputDTO {
		return await signInAnonymously(firebaseAuth);
	}
	async resetPassword(params: ResetPasswordInputDTO): ResetPasswordOutputDTO {
		const { email } = params;
		return await sendPasswordResetEmail(firebaseAuth, email);
	}
}
