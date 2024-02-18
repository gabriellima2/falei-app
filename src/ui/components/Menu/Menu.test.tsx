import { fireEvent, screen } from "@testing-library/react-native";

import { MenuContext } from "@/contexts/MenuContext";
import { Menu } from "./Menu";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

import type { MenuContextProperties } from "@/contexts/MenuContext/@types/menu-context-properties";
import type { MenuOption } from "@/contexts/MenuContext/@types/menu-option";

const MENU_OPTIONS: MenuOption[] = [{ text: "any_text", onPress: jest.fn() }];

const renderComponent = () =>
	renderWithThemeProvider(
		<MenuContext.Provider
			value={{ menuOptions: MENU_OPTIONS } as MenuContextProperties}
		>
			<Menu />
		</MenuContext.Provider>
	);

describe("<Menu />", () => {
	function forEachOption(cb: (option: MenuOption) => void) {
		MENU_OPTIONS.forEach((option) => cb(option));
	}

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			forEachOption((option) => {
				expect(screen.getByText(option.text)).toBeTruthy();
			});
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call onPress function when option is pressed", () => {
				renderComponent();

				forEachOption((option) => {
					const el = screen.getByText(option.text);
					fireEvent.press(el);

					expect(option.onPress).toHaveBeenCalled();
				});
			});
		});
	});
});
