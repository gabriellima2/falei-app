import { useRouter } from "expo-router";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

export type BaseLinkProps<TParams extends object> = Omit<
	TouchableOpacityProps,
	"onPress" | "accessibilityRole"
> & {
	href: {
		pathname: string;
		params?: TParams;
	};
};

export const BaseLink = <TParams extends object>(
	props: BaseLinkProps<TParams>
) => {
	const { href, ...rest } = props;
	const router = useRouter();
	return (
		<TouchableOpacity
			{...rest}
			onPress={() => router.push(href)}
			accessibilityRole="link"
			activeOpacity={0.8}
		/>
	);
};
