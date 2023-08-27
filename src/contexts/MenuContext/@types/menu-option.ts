import { IconStyles } from "@/@types/icon-styles";

export interface MenuOption {
	text: string;
	onPress?: () => void;
	icon?: (props: IconStyles) => JSX.Element;
}
