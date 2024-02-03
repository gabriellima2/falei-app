import { useRouter } from "expo-router";
import { useTheme } from "styled-components/native";
import { ArrowRight } from "lucide-react-native";

import { BaseButton, type BaseButtonProps } from "../../Buttons";
import { type BaseLinkProps } from "../BaseLink";

export type ButtonLinkProps<TParams extends object> = BaseButtonProps &
	BaseLinkProps<TParams> & {
		withArrowRight?: boolean;
	};

export const ButtonLink = <TParams extends object>(
	props: ButtonLinkProps<TParams>
) => {
	const { href, withArrowRight, ...rest } = props;
	const router = useRouter();
	const { colors } = useTheme();
	return (
		<BaseButton
			{...rest}
			onPress={() => router.push(href)}
			accessibilityRole="link"
			rightIcon={
				withArrowRight
					? (props) => <ArrowRight {...props} color={colors.font.primary} />
					: undefined
			}
		/>
	);
};
