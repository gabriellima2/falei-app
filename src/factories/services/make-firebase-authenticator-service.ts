import { FirebaseAuthenticatorService } from "@/services/firebase-authenticator.service";

export const makeFirebaseAuthenticatorService = () =>
	new FirebaseAuthenticatorService();
