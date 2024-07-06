import { ReactNode, useEffect, useRef, useState } from "react";

import { Menu } from "@/ui/components/Menu";
import { ViewReadExerciseContext } from "./ViewReadExerciseContext";

import type { ReadExerciseCategory } from "@/@types/exercise-type-categories";
import type { BottomSheetEl } from "@/@types/bottom-sheet-el";
import { ViewReadExerciseBottomSheet } from "@/ui/components/ViewReadExerciseBottomSheet";

type ViewReadExerciseProviderProps = {
	children: ReactNode;
};

export const ViewReadExerciseProvider = (
	props: ViewReadExerciseProviderProps
) => {
	const { children } = props;
	const ref = useRef<BottomSheetEl>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [exerciseId, setExerciseId] = useState<string | null>(null);
	const [readExerciseCategory, setReadExerciseCategory] =
		useState<ReadExerciseCategory | null>(null);

	const handleClose = () => {
		if (!ref.current) return;
		ref.current.close();
		clearStates();
	};

	const handleExpand = (exerciseId: string, category: ReadExerciseCategory) => {
		if (!ref.current) return;
		ref.current.expand();
		setReadExerciseCategory(category);
		setExerciseId(exerciseId);
		setIsVisible(true);
	};

	const handleToggle = (exerciseId: string, category: ReadExerciseCategory) => {
		if (!ref.current) return;
		if (!isVisible) return handleExpand(exerciseId, category);
		handleClose();
	};

	const clearStates = () => {
		setIsVisible(false);
		setReadExerciseCategory(null);
	};

	useEffect(() => {
		return clearStates;
	}, []);

	return (
		<ViewReadExerciseContext.Provider
			value={{
				ref,

				readExerciseCategory,
				exerciseId,

				handleClose,
				handleExpand,
				handleToggle,
			}}
		>
			{children}
			<ViewReadExerciseBottomSheet />
		</ViewReadExerciseContext.Provider>
	);
};
