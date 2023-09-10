import { Text } from "react-native";
import * as expoRouter from "expo-router";
import type { User } from "firebase/auth";

import { ProtectScreen } from "./ProtectScreen";
import { PRIVATE_GROUP_NAME, PUBLIC_GROUP_NAME } from "./constants/group-names";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import * as authStore from "@/store/auth-store";
import { mockReplace } from "jest-setup";

jest.mock("@/store/auth-store", () => ({ useAuthStore: jest.fn() }));

const user = {
	uid: "1",
	email: "any@email.com",
} as User;

const renderHighOrderComponent = () => {
	const PrivateComponent = ProtectScreen(() => <Text>Any Text</Text>);
	renderWithThemeProvider(<PrivateComponent />);
};

describe("<ProtectScreen />", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should redirect when user is authenticated and access a public route", () => {
		jest.spyOn(expoRouter, "useSegments").mockReturnValue(["any"]);
		jest.spyOn(expoRouter, "usePathname").mockReturnValue("/");
		jest.spyOn(authStore, "useAuthStore").mockImplementation((fn) =>
			fn({
				user,
				checkAuthState: jest.fn(),
				authHasBeenChecked: true,
				signOut: jest.fn(),
			})
		);
		renderHighOrderComponent();

		expect(mockReplace).toHaveBeenCalledWith(`/${PRIVATE_GROUP_NAME}/`);
	});
	it("should redirect when user is not authenticated and access a private route", () => {
		jest.spyOn(expoRouter, "useSegments").mockReturnValue([PRIVATE_GROUP_NAME]);
		jest.spyOn(expoRouter, "usePathname").mockReturnValue("/any");
		jest.spyOn(authStore, "useAuthStore").mockImplementation((fn) =>
			fn({
				user: null,
				checkAuthState: jest.fn(),
				authHasBeenChecked: true,
				signOut: jest.fn(),
			})
		);
		renderHighOrderComponent();

		expect(mockReplace).toHaveBeenCalledWith(`/${PUBLIC_GROUP_NAME}/login`);
	});
});
