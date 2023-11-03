import styled from "styled-components/native";
import { Check, CheckProps } from "@/components/commons";

type FilterByExerciseProps = {
	exercises: Pick<CheckProps, "items">["items"];
	onChange: (type: string) => Promise<void> | void;
};

export const FilterByExercise = (props: FilterByExerciseProps) => {
	const { exercises, onChange } = props;
	return (
		<Container horizontal showsHorizontalScrollIndicator={false}>
			<Check
				initialValue="breathing"
				onChange={(values) => onChange(values[0])}
				items={exercises}
			/>
		</Container>
	);
};

const Container = styled.ScrollView``;
