import { Stack } from "expo-router";
import { SendEmail } from "@/ui/templates";

import { makeAuthenticationAdapter } from "@/factories/adapters/make-authentication-adapter";

const authenticationAdapter = makeAuthenticationAdapter();

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "fade_from_bottom" }} />
			<SendEmail resetPasswordService={authenticationAdapter.resetPassword} />
		</>
	);
}
