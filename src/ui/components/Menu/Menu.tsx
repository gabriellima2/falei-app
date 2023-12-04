import { MenuOption } from "./components";
import { BottomSheet } from "../BottomSheet";

import { useMenuContext } from "@/contexts/MenuContext";

export const Menu = () => {
	const { ref, menuOptions, handleClose } = useMenuContext();
	return (
		<BottomSheet
			ref={ref}
			onChange={(position) => {
				if (position === -1) return handleClose();
			}}
		>
			{menuOptions.map((option) => (
				<MenuOption {...option} key={option.text} />
			))}
		</BottomSheet>
	);
};
