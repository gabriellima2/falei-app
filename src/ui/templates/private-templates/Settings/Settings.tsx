import styled, { css, useTheme } from "styled-components/native";
import { Bell, HelpCircle, User2 } from "lucide-react-native";

import { Header, Typography, ScrollContainer, ButtonLink } from "@/ui/atoms";
import { LogoutButton } from "./components";

import { useSettingsState } from "./hooks/use-settings-state";

export const Settings = () => {
	const { handleLogout } = useSettingsState();
	const { colors } = useTheme();
	return (
		<>
			<Header title="Configurações" />
			<ScrollContainer horizontalSpacing>
				<Content>
					<Options contentContainerStyle={{ gap: 16 }}>
						<ButtonLink
							secondary
							withArrowRight
							href={{ pathname: "/account" }}
							leftIcon={(props) => (
								<User2 {...props} color={colors.font.primary} />
							)}
						>
							Minha Conta
						</ButtonLink>
						<ButtonLink
							secondary
							withArrowRight
							href={{ pathname: "/notifications" }}
							leftIcon={(props) => (
								<Bell {...props} color={colors.font.primary} />
							)}
						>
							Notificações
						</ButtonLink>
						<ButtonLink
							secondary
							withArrowRight
							href={{ pathname: "/about" }}
							leftIcon={(props) => (
								<HelpCircle {...props} color={colors.font.primary} />
							)}
						>
							Sobre
						</ButtonLink>
						<LogoutButton onLogout={handleLogout} />
					</Options>
					<CreatedBy>© Gabriel Lima</CreatedBy>
				</Content>
			</ScrollContainer>
		</>
	);
};

const Options = styled.ScrollView``;

const Content = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;

const CreatedBy = styled(Typography.Small)`
	align-self: center;
`;
