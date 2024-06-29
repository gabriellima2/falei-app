import { useGetExerciseInteractions } from "./use-get-exercise-interactions";
import { useMenuContext } from "@/contexts/MenuContext";

export type UseBaseExerciseStateParams = {
	id: string;
	title: string;
	withCustomOptions?: boolean;
};

let lastId = "";

export function useBaseExerciseState(params: UseBaseExerciseStateParams) {
	const { id, title, withCustomOptions } = params;
	const { handleExpand, handleClose } = useMenuContext();
	const interactions = useGetExerciseInteractions({
		id,
		title,
		withCustomOptions,
	});

	const handleMenuState = () => {
		if (id !== lastId) {
			handleClose();
		}
		lastId = id;
		handleExpand(interactions);
	};

	return {
		handleLongPress: handleMenuState,
	};
}
