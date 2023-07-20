import '@testing-library/react-native';
import { firebaseAuth } from "@/helpers/firebase-auth";

export const mockPush = jest.fn();
export const mockReplace = jest.fn();
export const mockFirebaseAuth = firebaseAuth;

jest.mock("firebase/auth");
jest.mock("@/helpers/firebase-auth");
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
jest.mock('@expo/vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock("expo-router", () => ({ useRouter: () => ({ push: mockPush, replace: mockReplace }) }));
global.setImmediate = (callback) => setTimeout(callback, 0);
