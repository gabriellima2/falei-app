import { screen } from "@testing-library/react-native";

import { Header, type HeaderProps } from "./Header";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { FakeIconComponent } from "@/__mocks__/fake-icon-component";
import { mockNavigation } from "jest-setup";

const BACK_BUTTON_LABEL = "Voltar para a tela anterior";
const ICON_TEXT = "any_icon";
const defaultProps: Pick<Required<HeaderProps>, "title"> &
	Omit<HeaderProps, "title"> = {
	title: "any_title",
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<Header {...props} />);

const getTitleEl = () => screen.queryByText(defaultProps.title);
const getBackButtonEl = () => screen.queryByLabelText(BACK_BUTTON_LABEL);
const getIconEl = () => screen.queryByText(ICON_TEXT);

describe("<Header />", () => {
	describe("Render", () => {
		it("should render correctly only title text", () => {
			renderComponent();

			expect(getTitleEl()).toBeTruthy();
			expect(getBackButtonEl()).toBeFalsy();
			expect(getIconEl()).toBeFalsy();
		});
		it("should render correctly with title text and icon", () => {
			renderComponent({
				...defaultProps,
				headerRight: () => <FakeIconComponent icon={ICON_TEXT} />,
			});

			expect(getTitleEl()).toBeTruthy();
			expect(getBackButtonEl()).toBeFalsy();
			expect(screen.getByText(ICON_TEXT)).toBeTruthy();
		});
		it("should render correctly with title text and back-button", () => {
			mockNavigation.canGoBack.mockReturnValue(true);
			renderComponent();

			expect(getTitleEl()).toBeTruthy();
			expect(getBackButtonEl()).toBeTruthy();
			expect(getIconEl()).toBeFalsy();
		});
		it("should render correctly with icon and back-button", () => {
			mockNavigation.canGoBack.mockReturnValue(true);
			renderComponent({
				title: "",
				headerRight: () => <FakeIconComponent icon={ICON_TEXT} />,
			});

			expect(getTitleEl()).toBeFalsy();
			expect(getBackButtonEl()).toBeTruthy();
			expect(getIconEl()).toBeTruthy();
		});
	});
});
