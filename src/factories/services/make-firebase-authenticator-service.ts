import { FirebaseAuthenticatorServiceImpl } from "@/services/impl/firebase-authenticator.service.impl";

export const makeFirebaseAuthenticatorService = () =>
	new FirebaseAuthenticatorServiceImpl();
