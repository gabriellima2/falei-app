import { Stack } from "expo-router";
import styled from "styled-components/native";

import { ContainerWithDefaultSpaces } from "@/components";
import { Onboarding } from "@/screens";

export default function Home() {
	return (
		<Container topSpacing>
			<Stack.Screen options={{ headerShown: false }} />
			<Onboarding />
		</Container>
	);
}

const Container = styled(ContainerWithDefaultSpaces)`
	flex: 1;
`;
