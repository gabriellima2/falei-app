import { useTheme } from "styled-components/native";
import { ArrowRight } from "lucide-react-native";

import { ButtonLink } from "@/ui/atoms";
import type { IconStyles } from "@/@types/icon-styles";

export type OptionProps = Pick<Parameters<typeof ButtonLink>[0], "href"> & {
	text: string;
	icon: (props: IconStyles) => JSX.Element;
	testID?: string;
};

export const Option = (props: OptionProps) => {
	const { text, href, icon, ...rest } = props;
	const { colors } = useTheme();
	return (
		<ButtonLink
			{...rest}
			secondary
			href={href}
			leftIcon={(props) => icon({ ...props, color: colors.font.primary })}
			rightIcon={(props) => (
				<ArrowRight {...props} color={colors.font.primary} />
			)}
		>
			{text}
		</ButtonLink>
	);
};
