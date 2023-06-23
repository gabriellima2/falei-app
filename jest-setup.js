import '@testing-library/react-native';

export const mockPush = jest.fn();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock(
	"@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set.js",
	() => {
    return () => "";
	}
);
jest.mock("expo-router", () => (
  { useRouter: () => ({ push: mockPush }) }));
