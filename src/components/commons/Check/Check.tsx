import { Option, type OptionProps } from "./components";
import { useCheck, type UseCheckParams } from "./hooks/use-check";

export type CheckProps = UseCheckParams &
	Pick<OptionProps, "style"> & {
		items: Pick<OptionProps, "name" | "value">[];
	};

export const Check = (props: CheckProps) => {
	const { items, initialValue, multipleValues, onChange, ...rest } = props;
	const { handlePress, isChecked } = useCheck({
		initialValue,
		multipleValues,
		onChange,
	});
	return (
		<>
			{items.map((item) => (
				<Option
					{...item}
					{...rest}
					key={item.name}
					isChecked={isChecked(item.value)}
					onPress={handlePress}
				/>
			))}
		</>
	);
};
