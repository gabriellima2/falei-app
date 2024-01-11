import { Stack } from "expo-router";
import { Login } from "@/ui/templates";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "default" }} />
			<Login />
		</>
	);
}
