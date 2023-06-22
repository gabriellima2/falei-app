import { screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { CarouselList, type CarouselListProps } from "./CarouselList";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

type Data = { text: string; id: string };
type Props = Omit<CarouselListProps<Data>, "Item" | "changeCurrentItem">;

const renderComponent = (props: Props) =>
	renderWithThemeProvider(
		<CarouselList<Data>
			{...props}
			Item={(props) => <Text>{props.text}</Text>}
			changeCurrentItem={jest.fn()}
		/>
	);

describe("<CarouselList />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			const data: Data[] = [
				{ id: "1", text: "any_item_0" },
				{ id: "2", text: "any_item_1" },
			];
			const dataAmount = data.length;
			const ACTIVE_ITEM = 1;
			renderComponent({ data, currentItem: ACTIVE_ITEM });

			const indicators = screen.getAllByRole("button");
			const carouselProps = screen.getByTestId("carousel").props;

			expect(carouselProps.accessibilityValue.max).toBe(data.length);
			expect(carouselProps.accessibilityValue.min).toBe(1);
			expect(carouselProps.accessibilityValue.now).toBe(ACTIVE_ITEM);
			expect(indicators).toHaveLength(dataAmount);
			expect(screen.getByText(data[0].text)).toBeTruthy();
		});
	});
});
