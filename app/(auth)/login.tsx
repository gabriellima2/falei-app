import { Stack } from "expo-router";
import { Typography } from "@/components";

export default function Login() {
	return (
		<>
			<Stack.Screen options={{ title: "" }} />
			<Typography.Title>Olá, novamente! Entre para continuar</Typography.Title>
		</>
	);
}
