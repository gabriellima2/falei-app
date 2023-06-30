import '@testing-library/react-native';

export const mockPush = jest.fn();

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock("expo-router", () => ({ useRouter: () => ({ push: mockPush }) }));
global.setImmediate = (callback) => setTimeout(callback, 0);
