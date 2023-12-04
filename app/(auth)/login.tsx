import { Stack } from "expo-router";

import { Login } from "@/ui/templates";
import { firebaseSignIn } from "@/services/firebase-auth";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "default" }} />
			<Login authentication={firebaseSignIn} />
		</>
	);
}
