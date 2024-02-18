import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import {
	NotificationButton,
	NotificationButtonProps,
} from "./NotificationButton";
import { screen } from "@testing-library/react-native";

const renderComponent = (props: NotificationButtonProps) =>
	renderWithThemeProvider(<NotificationButton {...props} />);

const getButton = () => screen.getByLabelText("Notificações");
const getNewNotificationsIndicator = () =>
	screen.queryByLabelText("Indicador de novas notificações");

describe("<NotificationButton />", () => {
	describe("Render", () => {
		it("should render without the indicator when it has no new notifications", () => {
			renderComponent({ hasNewNotifications: false });

			expect(getButton()).toBeTruthy();
			expect(getNewNotificationsIndicator()).toBeFalsy();
		});
		it("should render with the indicator when it has new notifications", () => {
			renderComponent({ hasNewNotifications: true });

			expect(getButton()).toBeTruthy();
			expect(getNewNotificationsIndicator()).toBeTruthy();
		});
	});
});
