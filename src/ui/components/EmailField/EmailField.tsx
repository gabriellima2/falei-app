import { Field, FieldProps } from "../Field";

export type EmailFieldProps = Omit<
	FieldProps,
	"labelText" | "labelId" | "autoCapitalize" | "keyboardType"
>;

export const EmailField = (props: EmailFieldProps) => {
	return (
		<Field
			labelText="Email"
			labelId="email"
			placeholder="Ex: seuemail@gmail.com"
			returnKeyType="next"
			{...props}
			autoCapitalize="none"
			keyboardType="email-address"
		/>
	);
};
