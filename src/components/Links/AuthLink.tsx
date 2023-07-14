import styled from "styled-components/native";
import { BaseLink } from "../commons";

type AuthLinkProps = Pick<Parameters<typeof BaseLink>[0], "href" | "children">;

export const AuthLink = (props: AuthLinkProps) => (
	<Container {...props} onlyText hitSlop={20} />
);

const Container = styled(BaseLink)`
	flex: none;
	width: auto;
`;
