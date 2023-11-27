import { Option, type OptionProps } from "./components";
import { useCheck, type UseCheckParams } from "./hooks/use-check";

export type CheckProps = UseCheckParams & {
	items: Pick<OptionProps, "name" | "value">[];
	optionStyle?: Pick<OptionProps, "style">["style"];
};

export const Check = (props: CheckProps) => {
	const { items, optionStyle, ...rest } = props;
	const { handlePress, isChecked } = useCheck(rest);
	return (
		<>
			{items.map((item) => (
				<Option
					{...item}
					style={optionStyle}
					key={item.name}
					isChecked={isChecked(item.value)}
					onPress={handlePress}
				/>
			))}
		</>
	);
};
