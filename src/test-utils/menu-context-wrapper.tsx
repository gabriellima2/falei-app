import { PropsWithChildren } from "react";
import {
	MenuContext,
	type MenuContextProperties,
} from "@/contexts/MenuContext";

export const mocks = {
	handleClose: jest.fn(),
	handleExpand: jest.fn(),
	handleToggle: jest.fn(),
};

export const MenuContextWrapper = ({ children }: PropsWithChildren) => (
	<MenuContext.Provider
		value={{ ...mocks } as unknown as MenuContextProperties}
	>
		{children}
	</MenuContext.Provider>
);
