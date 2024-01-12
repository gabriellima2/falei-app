import { Text } from "react-native";
import * as Router from "expo-router";

import { ProtectScreen } from "./ProtectScreen";
import { PRIVATE_GROUP_NAME, PUBLIC_GROUP_NAME } from "./constants/group-names";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import * as authStore from "@/store/authentication-store";
import { mockReplace } from "jest-setup";
import { UserEntity } from "@/entities/user.entity";

jest.mock("@/store/auth-store", () => ({ useAuthStore: jest.fn() }));

const user = {
	id: "1",
	email: "any@email.com",
} as Omit<UserEntity, "password">;

const renderComponent = () => {
	const PrivateComponent = ProtectScreen(() => <Text>Any Text</Text>);
	renderWithThemeProvider(<PrivateComponent />);
};

describe("<ProtectScreen />", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should redirect when user is authenticated and access a public route", () => {
		jest.spyOn(Router, "useSegments").mockReturnValue(["any"]);
		jest.spyOn(Router, "usePathname").mockReturnValue("/");
		jest.spyOn(authStore, "useAuthenticationStore").mockImplementation((fn) =>
			fn({
				user,
				checkAuthState: jest.fn(),
				authHasBeenChecked: true,
				isNewUser: false,
				signOut: jest.fn(),
				anonymous: jest.fn(),
				resetPassword: jest.fn(),
				signIn: jest.fn(),
				signUp: jest.fn(),
			})
		);
		renderComponent();

		expect(mockReplace).toHaveBeenCalledWith(`/${PRIVATE_GROUP_NAME}/`);
	});
	it("should redirect when user is not authenticated and access a private route", () => {
		jest.spyOn(Router, "useSegments").mockReturnValue([PRIVATE_GROUP_NAME]);
		jest.spyOn(Router, "usePathname").mockReturnValue("/any");
		jest.spyOn(authStore, "useAuthenticationStore").mockImplementation((fn) =>
			fn({
				user: null,
				checkAuthState: jest.fn(),
				authHasBeenChecked: true,
				isNewUser: false,
				signOut: jest.fn(),
				anonymous: jest.fn(),
				resetPassword: jest.fn(),
				signIn: jest.fn(),
				signUp: jest.fn(),
			})
		);
		renderComponent();

		expect(mockReplace).toHaveBeenCalledWith(`/${PUBLIC_GROUP_NAME}/login`);
	});
});
