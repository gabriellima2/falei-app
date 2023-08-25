import { MutableRefObject } from "react";

import type { BottomSheetEl } from "@/@types/bottom-sheet-el";
import type { MenuOption } from "./menu-option";

export interface MenuContextProperties {
	menuOptions: MenuOption[];
	ref: MutableRefObject<BottomSheetEl>;
	handleExpand: (newOptions: MenuOption[]) => void;
	handleToggle: (newOptions: MenuOption[]) => void;
	handleClose: () => void;
}
