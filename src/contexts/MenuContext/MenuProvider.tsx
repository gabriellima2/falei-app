import { ReactNode, useEffect, useRef, useState } from "react";

import { Menu } from "@/components/commons/Menu";
import { MenuContext } from "./MenuContext";

import type { BottomSheetEl } from "@/@types/bottom-sheet-el";
import type { MenuOption } from "./@types/menu-option";

type MenuProviderProps = {
	children: ReactNode;
};

export const MenuProvider = (props: MenuProviderProps) => {
	const { children } = props;
	const ref = useRef<BottomSheetEl>(null);
	const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
	const [isVisible, setIsVisible] = useState(false);

	const handleClose = () => {
		if (!ref.current) return;
		ref.current.close();
		clearStates();
	};

	const handleExpand = (options: MenuOption[]) => {
		if (!ref.current) return;
		ref.current.expand();
		setMenuOptions(options);
		setIsVisible(true);
	};

	const handleToggle = (options: MenuOption[]) => {
		if (!ref.current) return;
		if (!isVisible) return handleExpand(options);
		handleClose();
	};

	const clearStates = () => {
		setMenuOptions([]);
		setIsVisible(false);
	};

	useEffect(() => {
		return clearStates;
	}, []);

	return (
		<MenuContext.Provider
			value={{ ref, menuOptions, handleClose, handleExpand, handleToggle }}
		>
			{children}
			<Menu />
		</MenuContext.Provider>
	);
};
