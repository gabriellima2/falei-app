import { Stack } from "expo-router";

import { Login } from "@/ui/templates";
import { makeFirebaseAuthenticatorService } from "@/factories/services/make-firebase-authenticator-service";

const firebaseAuthenticatorService = makeFirebaseAuthenticatorService();

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "default" }} />
			<Login authentication={firebaseAuthenticatorService.sigIn} />
		</>
	);
}
