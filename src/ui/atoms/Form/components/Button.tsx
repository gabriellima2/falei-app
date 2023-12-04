import { BaseButton, type BaseButtonProps } from "../../Buttons";
import { LoadingIndicator } from "../../LoadingIndicator";

type ButtonProps = BaseButtonProps & {
	isSubmitting?: boolean;
};

export const Button = (props: ButtonProps) => {
	const { isSubmitting, disabled, children, ...rest } = props;
	const Content = isSubmitting ? <LoadingIndicator size="large" /> : children;
	return (
		<BaseButton {...rest} disabled={disabled || isSubmitting}>
			{Content}
		</BaseButton>
	);
};
