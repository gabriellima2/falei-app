import styled from "styled-components/native";
import { Check, CheckProps } from "@/components/commons";

export type FilterByExerciseProps = Pick<
	CheckProps,
	"initialValue" | "onChange"
> & {
	exercises: Pick<CheckProps, "items">["items"];
};

export const FilterByExercise = (props: FilterByExerciseProps) => {
	const { exercises, ...rest } = props;
	return (
		<Container
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
		>
			<Check {...rest} items={exercises} optionStyle={{ minWidth: 134 }} />
		</Container>
	);
};

const Container = styled.ScrollView``;
