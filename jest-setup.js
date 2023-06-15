import '@testing-library/react-native';

export const mockNavigate = jest.fn();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock(
	"@expo/vector-icons/build/vendor/react-native-vector-icons/lib/create-icon-set.js",
	() => {
    return () => "";
	}
);
jest.mock("@react-navigation/native", () => (
  { useNavigation: () => ({ navigate: mockNavigate }) }));
