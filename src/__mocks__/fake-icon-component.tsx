import { Text } from "react-native";

type FakeIconComponentProps = { icon: string };

export const FakeIconComponent = (props: FakeIconComponentProps) => (
	<Text>{props.icon}</Text>
);
