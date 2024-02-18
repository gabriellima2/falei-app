import '@testing-library/react-native';

export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockRedirect = jest.fn();
export const mockNavigation = { canGoBack: jest.fn() };

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

jest.mock("expo-router", () => ({
	Redirect: mockRedirect,
	useRouter: () => ({ push: mockPush, replace: mockReplace }),
	usePathname: jest.fn(),
	useSegments: jest.fn(),
	useNavigation: jest.fn().mockReturnValue(mockNavigation),
	useRootNavigationState: jest.fn().mockReturnValue(({ key: "any_key" }))
}));

jest.mock("@gorhom/bottom-sheet", () => {
	const reactNative = jest.requireActual("react-native");
	const { View } = reactNative;
	return {
		__esModule: true,
		default: View,
		BottomSheet: View,
		BottomSheetProvider: View,
		BottomSheetScrollView: View,
		useBottomSheetDynamicSnapPoints: jest.fn().mockReturnValue({
      animatedHandleHeight: 10,
      animatedSnapPoints: [100, 200],
      animatedContentHeight: 300,
      handleContentLayout: jest.fn()
		})
	};
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);


jest.mock("firebase/auth", () => ({
	...jest.requireActual("firebase/auth"),
	getAuth: jest.fn(),
	getReactNativePersistence: jest.fn(),
	initializeAuth: jest.fn()
}));

global.setImmediate = (callback) => setTimeout(callback, 0);
