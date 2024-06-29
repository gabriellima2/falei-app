import { useGetExerciseInteractions } from "./use-get-exercise-interactions";
import { useMenuContext } from "@/contexts/MenuContext";

export type UseBaseExerciseStateParams = {
	id: string;
	withCustomOptions?: boolean;
};

let lastId = "";

export function useBaseExerciseState(params: UseBaseExerciseStateParams) {
	const { id, withCustomOptions } = params;
	const { handleExpand, handleClose } = useMenuContext();
	const interactions = useGetExerciseInteractions({ id, withCustomOptions });

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
