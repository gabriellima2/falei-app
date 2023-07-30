import { Stack } from "expo-router";

import { Login } from "@/screens";
import { AuthLink } from "@/components";

import { firebaseSignIn } from "@/services/firebase";

export default function Page() {
	return (
		<>
			<Stack.Screen
				options={{
					title: "",
					headerShown: true,
					animation: "default",
					headerRight: () => (
						<AuthLink href={{ pathname: "create-account" }}>
							Criar Conta
						</AuthLink>
					),
				}}
			/>
			<Login authentication={firebaseSignIn} />
		</>
	);
}
