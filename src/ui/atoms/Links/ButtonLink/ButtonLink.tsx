import { useRouter } from "expo-router";

import { BaseButton, type BaseButtonProps } from "../../Buttons";
import { type BaseLinkProps } from "../BaseLink";

export type ButtonLinkProps<TParams extends object> = BaseButtonProps &
	BaseLinkProps<TParams>;

export const ButtonLink = <TParams extends object>(
	props: ButtonLinkProps<TParams>
) => {
	const { href, ...rest } = props;
	const router = useRouter();
	return (
		<BaseButton
			{...rest}
			onPress={() => router.push(href)}
			accessibilityRole="link"
		/>
	);
};
