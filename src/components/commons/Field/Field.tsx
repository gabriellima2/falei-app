import { View } from "react-native";

import { Input, InputProps } from "../Input";
import { TextError } from "../Errors";
import { Label } from "../Label";

export type FieldProps = Omit<
	InputProps,
	"accessibilityLabelledBy" | "isInvalid"
> & {
	labelText: string;
	labelId: string;
	errorMessage?: string;
};

export const Field = (props: FieldProps) => {
	const { labelId, labelText, errorMessage, ...rest } = props;
	const hasError = !!errorMessage;
	return (
		<View>
			<Label id={labelId}>{labelText}</Label>
			<Input
				{...rest}
				isInvalid={hasError}
				aria-labelledby={labelId}
				accessibilityLabelledBy={labelId}
			/>
			<View accessibilityLiveRegion="polite" aria-live="polite">
				{hasError && <TextError>{errorMessage}</TextError>}
			</View>
		</View>
	);
};
