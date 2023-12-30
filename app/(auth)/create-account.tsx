import { Stack } from "expo-router";

import { CreateAccount } from "@/ui/templates";
import { makeAuthenticationAdapter } from "@/factories/adapters/make-authentication-adapter";

const authenticationAdapter = makeAuthenticationAdapter();

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "slide_from_right" }} />
			<CreateAccount signUp={authenticationAdapter.signUp} />
		</>
	);
}
