import styled, { css } from "styled-components/native";

import { Header, ScrollContainer, Typography } from "@/ui/atoms";
import { LogoutButton, Options } from "./components";

import { useAuthStore } from "@/store/auth-store";

export const Settings = () => {
	const { signOut } = useAuthStore((state) => state);
	return (
		<>
			<Header title="Configurações" />
			<ScrollContainer>
				<Content>
					<Options>
						<LogoutButton onLogout={signOut} />
					</Options>
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
