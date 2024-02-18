import { Text } from "react-native";
import * as Router from "expo-router";

import { ProtectScreen } from "./ProtectScreen";
import { PRIVATE_GROUP_NAME, PUBLIC_GROUP_NAME } from "./constants/group-names";

import * as AuthenticationStore from "@/store/authentication-store/authentication.store";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import { mockReplace } from "jest-setup";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const segmentsSpy = jest.spyOn(Router, "useSegments");
const pathnameSpy = jest.spyOn(Router, "usePathname");
const useAuthenticationStoreSpy = jest.spyOn(
	AuthenticationStore,
	"useAuthenticationStore"
);

const renderComponent = () => {
	const PrivateComponent = ProtectScreen(() => <Text>Any Text</Text>);
	renderWithThemeProvider(<PrivateComponent />);
};

describe("<ProtectScreen />", () => {
	const authenticationStoreMock = {
		user: {
			id: "1",
			email: "any@email.com",
			emailVerified: true,
		},
		checkAuthState: jest.fn(),
		authHasBeenChecked: true,
		isNewUser: false,
		signOut: jest.fn(),
		anonymous: jest.fn(),
		resetPassword: jest.fn(),
		signIn: jest.fn(),
		signUp: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should redirect when user is not email verified", () => {
		segmentsSpy.mockReturnValue(["any"]);
		pathnameSpy.mockReturnValue("/");
		useAuthenticationStoreSpy.mockReturnValue({
			...authenticationStoreMock,
			user: { ...authenticationStoreMock.user, emailVerified: false },
		});
		renderComponent();

		expect(mockReplace).toHaveBeenCalledWith(
			`/${PUBLIC_GROUP_NAME}/email-verification`
		);
	});

	it("should redirect when user is authenticated and access a public route", () => {
		segmentsSpy.mockReturnValue(["any"]);
		pathnameSpy.mockReturnValue("/");
		useAuthenticationStoreSpy.mockReturnValue({ ...authenticationStoreMock });
		renderComponent();

		expect(mockReplace).toHaveBeenCalledWith(`/${PRIVATE_GROUP_NAME}/`);
	});
	it("should redirect when user is not authenticated and access a private route", () => {
		segmentsSpy.mockReturnValue([PRIVATE_GROUP_NAME]);
		pathnameSpy.mockReturnValue("/any");
		useAuthenticationStoreSpy.mockReturnValue({
			...authenticationStoreMock,
			user: null,
		});
		renderComponent();

		expect(mockReplace).toHaveBeenCalledWith(`/${PUBLIC_GROUP_NAME}/login`);
	});
});
