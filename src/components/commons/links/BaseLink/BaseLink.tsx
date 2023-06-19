import { useNavigation } from "@/hooks/use-navigate";
import { BaseButton, BaseButtonProps } from "../../Buttons";

export type BaseLinkProps<StackParams> = BaseButtonProps & {
	to: {
		name: keyof StackParams;
		params?: unknown;
	};
};

export const BaseLink = <StackParams extends object>(
	props: BaseLinkProps<StackParams>
) => {
	const { to, ...rest } = props;
	const { navigate } = useNavigation<StackParams>();
	return (
		<BaseButton
			onlyText
			{...rest}
			onPress={() =>
				// Fix Types
				to.params
					? navigate((to.name, { ...to.params }) as any)
					: navigate(to.name as any)
			}
			accessibilityRole="link"
		/>
	);
};
