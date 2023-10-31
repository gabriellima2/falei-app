import styled from "styled-components/native";

import { Option, type OptionProps } from "./components";
import { useCheck, type UseCheckParams } from "./hooks/use-check";

type CheckProps = UseCheckParams & {
	items: OptionProps[];
};

export const Check = (props: CheckProps) => {
	const { items, value, onChange } = props;
	const { currentValue, handlePress } = useCheck({ value, onChange });
	return (
		<Container>
			{items.map((item) => (
				<Option
					{...item}
					key={item.name}
					isActive={item.value === currentValue}
					onPress={handlePress}
				/>
			))}
		</Container>
	);
};

const Container = styled.View``;
