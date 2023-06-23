import { useRouter } from "expo-router";
import { BaseButton, type BaseButtonProps } from "../../Buttons";

export type BaseLinkProps<TParams extends object> = BaseButtonProps & {
	href: {
		pathname: string;
		params?: TParams;
	};
};

export const BaseLink = <StackParams extends object>(
	props: BaseLinkProps<StackParams>
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
