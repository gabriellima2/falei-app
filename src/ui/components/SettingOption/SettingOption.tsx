import { useTheme } from "styled-components/native";
import { ArrowRight } from "lucide-react-native";

import { ButtonLink } from "@/ui/atoms";
import type { IconStyles } from "@/@types/icon-styles";

export type SettingOptionProps = Pick<
	Parameters<typeof ButtonLink>[0],
	"href"
> & {
	text: string;
	icon: (props: IconStyles) => JSX.Element;
};

export const SettingOption = (props: SettingOptionProps) => {
	const { text, href, icon } = props;
	const { colors } = useTheme();
	return (
		<ButtonLink
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
