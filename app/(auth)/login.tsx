import { Stack } from "expo-router";

import { Login } from "@/screens";
import { firebaseSignIn } from "@/services/firebase";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "default" }} />
			<Login authentication={firebaseSignIn} />
		</>
	);
}
