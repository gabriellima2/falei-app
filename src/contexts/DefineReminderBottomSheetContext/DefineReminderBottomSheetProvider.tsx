import { ReactNode, useEffect, useRef, useState } from "react";

import { DefineReminderBottomSheet } from "@/ui/components/DefineReminderBottomSheet";
import { DefineReminderBottomSheetContext } from "./DefineReminderBottomSheetContext";

import type { BottomSheetEl } from "@/@types/bottom-sheet-el";

type DefineReminderBottomSheetProviderProps = {
	children: ReactNode;
};

export const DefineReminderBottomSheetProvider = (
	props: DefineReminderBottomSheetProviderProps
) => {
	const { children } = props;
	const ref = useRef<BottomSheetEl>(null);
	const [isVisible, setIsVisible] = useState(false);

	const handleClose = () => {
		if (!ref.current) return;
		ref.current.close();
		clearStates();
	};

	const handleExpand = () => {
		if (!ref.current) return;
		ref.current.expand();
		setIsVisible(true);
	};

	const handleToggle = () => {
		if (!ref.current) return;
		if (!isVisible) return handleExpand();
		handleClose();
	};

	const clearStates = () => {
		setIsVisible(false);
	};

	useEffect(() => {
		return clearStates;
	}, []);

	return (
		<DefineReminderBottomSheetContext.Provider
			value={{ ref, handleClose, handleExpand, handleToggle }}
		>
			{children}
			<DefineReminderBottomSheet ref={ref} onClose={handleClose} />
		</DefineReminderBottomSheetContext.Provider>
	);
};
