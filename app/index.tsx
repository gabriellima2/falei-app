import { Stack } from "expo-router";
import styled from "styled-components/native";

import { ContainerWithDefaultSpaces } from "@/ui/atoms";
import { Onboarding } from "@/ui/screens";
import { ProtectScreen } from "@/hocs";

function Page() {
	return (
		<Container topSpacing bottomSpacing>
			<Stack.Screen />
			<Onboarding />
		</Container>
	);
}

export default ProtectScreen(Page);

const Container = styled(ContainerWithDefaultSpaces)`
	flex: 1;
`;
