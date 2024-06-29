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
	const [selectedExercise, setSelectedExercise] =
		useState<SelectedExercise | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	const handleClose = () => {
		if (!ref.current) return;
		ref.current.close();
		clearStates();
	};

	const handleExpand = (exercise: SelectedExercise) => {
		if (!ref.current) return;
		ref.current.expand();
		setSelectedExercise(exercise);
		setIsVisible(true);
	};

	const handleToggle = (exercise: SelectedExercise) => {
		if (!ref.current) return;
		if (!isVisible) return handleExpand(exercise);
		handleClose();
	};

	const clearStates = () => {
		setIsVisible(false);
		setSelectedExercise(null);
	};

	useEffect(() => {
		return clearStates;
	}, []);

	return (
		<DefineReminderBottomSheetContext.Provider
			value={{ ref, selectedExercise, handleClose, handleExpand, handleToggle }}
		>
			{children}
			<DefineReminderBottomSheet />
		</DefineReminderBottomSheetContext.Provider>
	);
};
