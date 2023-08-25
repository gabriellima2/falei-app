import { BottomSheet } from "./BottomSheet";
import { Typography } from "./Typography";

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
				<Typography.Title key={option.name}>{option.name}</Typography.Title>
			))}
		</BottomSheet>
	);
};
