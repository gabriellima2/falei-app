import { Stack } from "expo-router";
import styled from "styled-components/native";

import { ContainerWithDefaultSpaces } from "@/ui/components";
import { ProtectScreen } from "@/hocs";
import { Onboarding } from "@/ui/screens";

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
