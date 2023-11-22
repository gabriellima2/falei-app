import styled from "styled-components/native";

import { Check, CheckProps } from "@/components/commons";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

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
					{ name: "Respiração", value: ExerciseCategoryEntity.Breathing },
					{
						name: "Trava-línguas",
						value: ExerciseCategoryEntity.TongueTwister,
					},
					{ name: "Poemas", value: ExerciseCategoryEntity.Poem },
				]}
				optionStyle={{ minWidth: 134 }}
			/>
		</Container>
	);
};

const Container = styled.ScrollView``;
