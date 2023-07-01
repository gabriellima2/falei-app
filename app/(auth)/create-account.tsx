import { Stack } from "expo-router";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ScreenContent, Typography, Input } from "@/components";
import { Label } from "@/components/commons/Label";
import { TextError } from "@/components/commons/Errors/TextError";

export default function CreateAccount() {
	return (
		<>
			<Stack.Screen options={{ title: "" }} />
			<ScreenContent horizontalSpacing>
				<Title>Bem-vindo! Crie uma conta para continuar</Title>
				<Label id="username">Usuário</Label>
				<Input
					accessibilityLabelledBy="username"
					placeholder="Exemplo: Gabriel123"
					rightIcon={(props) => <Ionicons name="add" {...props} />}
				/>
				<TextError>Digite um email válido</TextError>
			</ScreenContent>
		</>
	);
}

const Title = styled(Typography.Title)`
	max-width: 200px;
`;
