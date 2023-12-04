import styled, { css } from "styled-components/native";
import { Bell, HelpCircle, User2 } from "lucide-react-native";

import { SettingOption } from "@/ui/components";
import { Header, LogoutButton, ScrollContainer, Typography } from "@/ui/atoms";

import { useAuthStore } from "@/store/auth-store";

export const Settings = () => {
	const { signOut } = useAuthStore((state) => state);
	return (
		<>
			<Header title="Configurações" />
			<ScrollContainer>
				<Content>
					<Options>
						<SettingOption
							text="Minha Conta"
							href={{ pathname: "/account" }}
							icon={(props) => <User2 {...props} />}
						/>
						<SettingOption
							text="Notificações"
							href={{ pathname: "/notifications" }}
							icon={(props) => <Bell {...props} />}
						/>
						<SettingOption
							text="Sobre"
							href={{ pathname: "/about" }}
							icon={(props) => <HelpCircle {...props} />}
						/>
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

const Options = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[3]};
	`}
`;

const CreatedBy = styled(Typography.Small)`
	align-self: center;
`;
