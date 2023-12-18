import styled from "styled-components/native";
import { Check, type CheckProps } from "@/ui/components";

export type FilterByCategoryProps = Pick<
	CheckProps,
	"initialValue" | "onChange"
> & {
	categories: Pick<CheckProps, "items">["items"];
};

export const FilterByCategory = (props: FilterByCategoryProps) => {
	const { categories, ...rest } = props;
	return (
		<Container
			horizontal
			testID="categories"
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
		>
			<Check {...rest} items={categories} optionStyle={{ minWidth: 134 }} />
		</Container>
	);
};

const Container = styled.ScrollView`
	flex: none;
`;
