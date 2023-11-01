import styled from "styled-components/native";

import { Option, type OptionProps } from "./components";
import { useCheck, type UseCheckParams } from "./hooks/use-check";

type CheckProps = UseCheckParams & {
	items: OptionProps[];
};

export const Check = (props: CheckProps) => {
	const { items, initialValue, multipleValues, onChange } = props;
	const { handlePress, isChecked } = useCheck({
		initialValue,
		multipleValues,
		onChange,
	});
	return (
		<Container>
			{items.map((item) => (
				<Option
					{...item}
					key={item.name}
					isActive={isChecked(item.value)}
					onPress={handlePress}
				/>
			))}
		</Container>
	);
};

const Container = styled.View``;
