import { Stack } from "expo-router";

import { Login } from "@/screens";
import { AuthLink } from "@/components";

export default function Page() {
	return (
		<>
			<Stack.Screen
				options={{
					title: "",
					animation: "default",
					headerRight: () => (
						<AuthLink href={{ pathname: "create-account" }}>
							Criar Conta
						</AuthLink>
					),
				}}
			/>
			<Login />
		</>
	);
}
