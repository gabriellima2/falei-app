import { Text } from "react-native";
import * as Router from "expo-router";

import { ProtectScreen } from "./ProtectScreen";
import { PRIVATE_GROUP_NAME, PUBLIC_GROUP_NAME } from "./constants/group-names";

import * as AuthenticationStore from "@/store/authentication-store/authentication.store";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { mockReplace } from "jest-setup";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const segmentsSpy = jest.spyOn(Router, "useSegments");
const pathnameSpy = jest.spyOn(Router, "usePathname");
const authenticationStoreSpy = jest.spyOn(
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

	it("should redirect when user is authenticated and access a public route", () => {
		segmentsSpy.mockReturnValue(["any"]);
		pathnameSpy.mockReturnValue("/");
		authenticationStoreSpy.mockReturnValue({ ...authenticationStoreMock });
		renderComponent();

		expect(mockReplace).toHaveBeenCalledWith(`/${PRIVATE_GROUP_NAME}/`);
	});
	it("should redirect when user is not authenticated and access a private route", () => {
		segmentsSpy.mockReturnValue([PRIVATE_GROUP_NAME]);
		pathnameSpy.mockReturnValue("/any");
		authenticationStoreSpy.mockReturnValue({
			...authenticationStoreMock,
			user: null,
		});
		renderComponent();

		expect(mockReplace).toHaveBeenCalledWith(`/${PUBLIC_GROUP_NAME}/login`);
	});
});
