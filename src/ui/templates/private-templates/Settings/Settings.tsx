import styled, { css } from "styled-components/native";

import { Header, Typography, ScrollContainer } from "@/ui/atoms";
import { LogoutButton, Options } from "./components";

import { useSettingsState } from "./hooks/use-settings-state";

export const Settings = () => {
	const { handleLogout } = useSettingsState();
	return (
		<>
			<Header title="Configurações" />
			<ScrollContainer horizontalSpacing>
				<Content>
					<Options
						additional={() => <LogoutButton onLogout={handleLogout} />}
					/>
					<CreatedBy>© Gabriel Lima</CreatedBy>
				</Content>
			</ScrollContainer>
		</>
	);
};

const Content = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;

const CreatedBy = styled(Typography.Small)`
	align-self: center;
`;
