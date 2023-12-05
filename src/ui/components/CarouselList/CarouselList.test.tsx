import { fireEvent, screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { CarouselList } from "./CarouselList";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

type Data = { text: string; id: string };

const DATA: Data[] = [
	{ id: "1", text: "any_item_0" },
	{ id: "2", text: "any_item_1" },
];
const CURRENT_ITEM = 0;
const onCurrentItemChangeMock = jest.fn();

const renderComponent = () =>
	renderWithThemeProvider(
		<CarouselList<Data>
			data={DATA}
			currentItem={CURRENT_ITEM}
			Item={(props) => <Text>{props.text}</Text>}
			onCurrentItemChange={onCurrentItemChangeMock}
		/>
	);

describe("<CarouselList />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			const dataAmount = DATA.length;
			renderComponent();

			const indicators = screen.getAllByRole("button");
			const carouselProps = screen.getByTestId("carousel").props;

			expect(carouselProps.accessibilityValue.max).toBe(dataAmount);
			expect(carouselProps.accessibilityValue.min).toBe(1);
			expect(carouselProps.accessibilityValue.now).toBe(CURRENT_ITEM);
			expect(indicators).toHaveLength(dataAmount);
			expect(screen.getByText(DATA[0].text)).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should change the current active item when click in indicator", () => {
				renderComponent();
				const item = CURRENT_ITEM + 1;

				const indicator = screen.getAllByRole("button")[item];
				fireEvent.press(indicator);

				expect(onCurrentItemChangeMock).toHaveBeenCalledWith(item);
			});
		});
	});
});
