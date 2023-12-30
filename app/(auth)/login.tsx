import { Stack } from "expo-router";

import { Login } from "@/ui/templates";
import { makeAuthenticationAdapter } from "@/factories/adapters/make-authentication-adapter";

const authenticationAdapter = makeAuthenticationAdapter();

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "default" }} />
			<Login signIn={authenticationAdapter.signIn} />
		</>
	);
}
