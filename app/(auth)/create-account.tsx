import { Stack } from "expo-router";
import { CreateAccount } from "@/screens";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ title: "" }} />
			<CreateAccount />
		</>
	);
}
