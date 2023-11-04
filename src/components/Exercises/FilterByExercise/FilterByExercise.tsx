import styled from "styled-components/native";
import { Check, CheckProps } from "@/components/commons";

export type FilterByExerciseProps = {
	exercises: Pick<CheckProps, "items">["items"];
	onChange: (type: string) => Promise<void> | void;
};

export const FilterByExercise = (props: FilterByExerciseProps) => {
	const { exercises, onChange } = props;
	return (
		<Container
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
		>
			<Check
				initialValue="breathing"
				onChange={(values) => onChange(values[0])}
				items={exercises}
				optionStyle={{ minWidth: 134 }}
			/>
		</Container>
	);
};

const Container = styled.ScrollView``;
