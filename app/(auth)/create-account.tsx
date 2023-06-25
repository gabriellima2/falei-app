import { Stack } from "expo-router";
import { Typography } from "@/components";

export default function CreateAccount() {
	return (
		<>
			<Stack.Screen options={{ title: "" }} />
			<Typography.Title>
				Bem-vindo! Crie uma conta para continuar
			</Typography.Title>
		</>
	);
}
