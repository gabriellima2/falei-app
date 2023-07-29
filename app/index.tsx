import { Stack } from "expo-router";
import styled from "styled-components/native";

import { ContainerWithDefaultSpaces } from "@/components";
import { ProtectScreen } from "@/hocs";
import { Onboarding } from "@/screens";

function Page() {
	return (
		<Container topSpacing>
			<Stack.Screen options={{ headerShown: false }} />
			<Onboarding />
		</Container>
	);
}

export default ProtectScreen(Page);

const Container = styled(ContainerWithDefaultSpaces)`
	flex: 1;
`;
