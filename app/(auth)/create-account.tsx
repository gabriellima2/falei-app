import { Stack } from "expo-router";

import { CreateAccount } from "@/screens";
import { firebaseSignUp } from "@/services/firebase";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "slide_from_right" }} />
			<CreateAccount authentication={firebaseSignUp} />
		</>
	);
}
