import '@testing-library/react-native';

export const mockPush = jest.fn();
export const mockReplace = jest.fn();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock("expo-router", () => ({
	useRouter: () => ({ push: mockPush, replace: mockReplace }),
	usePathname: jest.fn(),
	useSegments: jest.fn(),
	useRootNavigationState: jest.fn().mockReturnValue(({ key: "any_key" }))
}));
global.setImmediate = (callback) => setTimeout(callback, 0);
