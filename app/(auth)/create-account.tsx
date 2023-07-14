import { Stack } from "expo-router";

import { CreateAccount } from "@/screens";
import { AuthLink } from "@/components";

export default function Page() {
	return (
		<>
			<Stack.Screen
				options={{
					title: "",
					animation: "slide_from_right",
					headerRight: () => (
						<AuthLink href={{ pathname: "login" }}>Entrar</AuthLink>
					),
				}}
			/>
			<CreateAccount />
		</>
	);
}
