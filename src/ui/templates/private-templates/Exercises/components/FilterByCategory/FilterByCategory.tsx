import styled from "styled-components/native";

import { Check, type CheckProps } from "@/ui/components";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { categoriesPortuguese } from "@/constants/categories-portuguese";

export type FilterByCategoryProps = Pick<
	CheckProps,
	"initialValue" | "onChange"
>;

const filterOptions: Pick<CheckProps, "items">["items"] = [
	{
		name: categoriesPortuguese.incomplete,
		value: ExerciseCategoryEntity.Incomplete,
	},
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
];

export const FilterByCategory = (props: FilterByCategoryProps) => {
	return (
		<Container
			horizontal
			testID="categories"
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
		>
			<Check {...props} items={filterOptions} optionStyle={{ minWidth: 134 }} />
		</Container>
	);
};

const Container = styled.ScrollView`
	flex: none;
`;
