import { screen } from "@testing-library/react-native";

import { Header, type HeaderProps } from "./Header";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import { FakeIconComponent } from "@/test-utils/fake-icon-component";
import { mockNavigation } from "jest-setup";

const ICON_TEXT = "any_icon";
const defaultProps: Pick<Required<HeaderProps>, "title"> &
	Omit<HeaderProps, "title"> = {
	title: "any_title",
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<Header {...props} />);

const getBackButtonEl = () =>
	screen.queryByLabelText("Voltar para a tela anterior");
const getTitleEl = () => screen.queryByText(defaultProps.title);
const getIconEl = () => screen.queryByText("any_icon");

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
				withBack: true,
				headerRight: () => <FakeIconComponent icon={ICON_TEXT} />,
			});

			expect(getTitleEl()).toBeTruthy();
			expect(getBackButtonEl()).toBeFalsy();
			expect(getIconEl()).toBeTruthy();
		});
		it("should render correctly with title text and back-button", () => {
			mockNavigation.canGoBack.mockReturnValue(true);
			renderComponent({ ...defaultProps, withBack: true });

			expect(getTitleEl()).toBeTruthy();
			expect(getBackButtonEl()).toBeTruthy();
			expect(getIconEl()).toBeFalsy();
		});
		it("should render correctly with icon and back-button", () => {
			mockNavigation.canGoBack.mockReturnValue(true);
			renderComponent({
				title: "",
				headerRight: () => <FakeIconComponent icon={ICON_TEXT} />,
				withBack: true,
			});

			expect(getTitleEl()).toBeFalsy();
			expect(getBackButtonEl()).toBeTruthy();
			expect(getIconEl()).toBeTruthy();
		});
	});
});
