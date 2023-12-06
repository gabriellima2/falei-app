import { type PropsWithChildren } from "react";
import styled from "styled-components/native";
import { Bell, HelpCircle, User2 } from "lucide-react-native";

import { Option, type OptionProps } from "./components/Option";

type OptionsProps = PropsWithChildren & {
	items?: OptionProps[];
};

const defaultItems: OptionProps[] = [
	{
		text: "Minha Conta",
		href: { pathname: "/account" },
		icon: (props) => <User2 {...props} />,
	},
	{
		text: "Notificações",
		href: { pathname: "/notifications" },
		icon: (props) => <Bell {...props} />,
	},
	{
		text: "Sobre",
		href: { pathname: "/about" },
		icon: (props) => <HelpCircle {...props} />,
	},
];

export const Options = (props: OptionsProps) => {
	const { items = defaultItems, children } = props;
	return (
		<Container contentContainerStyle={{ gap: 16 }}>
			{items.map((item) => (
				<Option key={item.text} {...item} />
			))}
			{children}
		</Container>
	);
};

const Container = styled.ScrollView``;
