import { Stack } from "expo-router";

import { CreateAccount } from "@/ui/templates";
import { makeFirebaseAuthenticatorService } from "@/factories/services/make-firebase-authenticator-service";

const firebaseAuthenticatorService = makeFirebaseAuthenticatorService();

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "slide_from_right" }} />
			<CreateAccount authentication={firebaseAuthenticatorService.signUp} />
		</>
	);
}
