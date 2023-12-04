import { Stack } from "expo-router";

import { CreateAccount } from "@/ui/templates";
import { firebaseSignUp } from "@/services/firebase-auth";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "slide_from_right" }} />
			<CreateAccount authentication={firebaseSignUp} />
		</>
	);
}
