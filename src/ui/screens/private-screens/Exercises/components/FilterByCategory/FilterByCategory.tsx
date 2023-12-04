import styled from "styled-components/native";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { Check, type CheckProps } from "@/ui/components/commons";

import { categoriesPortuguese } from "@/constants/categories-portuguese";

export type FilterByCategoryProps = Pick<
	CheckProps,
	"initialValue" | "onChange"
>;

export const FilterByCategory = (props: FilterByCategoryProps) => {
	return (
		<Container
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
		>
			<Check
				{...props}
				items={[
					{
						name: categoriesPortuguese.breathing_exercises,
						value: ExerciseCategoryEntity.Breathing,
					},
					{
						name: categoriesPortuguese.tongue_twister_exercises,
						value: ExerciseCategoryEntity.TongueTwister,
					},
					{
						name: categoriesPortuguese.poem_exercises,
						value: ExerciseCategoryEntity.Poem,
					},
				]}
				optionStyle={{ minWidth: 134 }}
			/>
		</Container>
	);
};

const Container = styled.ScrollView`
	flex: none;
`;
