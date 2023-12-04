import { TextLink } from "../commons";

type AuthLinkProps = Pick<Parameters<typeof TextLink>[0], "href" | "children">;

export const AuthLink = (props: AuthLinkProps) => (
	<TextLink {...props} hitSlop={20} />
);
