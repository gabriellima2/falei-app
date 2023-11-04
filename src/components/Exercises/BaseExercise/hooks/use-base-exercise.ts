import { useMenuContext } from "@/contexts/MenuContext";
import { interactions } from "../constants/interactions";

export type UseBaseExerciseParams = {
	id: string;
	withCustomOptions?: boolean;
};

let lastId = "";

export function useBaseExercise(params: UseBaseExerciseParams) {
	const { id, withCustomOptions } = params;
	const { handleExpand, handleClose } = useMenuContext();

	const options = withCustomOptions
		? interactions.custom
		: interactions.default;

	const handleMenuState = () => {
		if (id !== lastId) {
			handleClose();
		}
		lastId = id;
		handleExpand(options);
	};

	return {
		handleLongPress: handleMenuState,
	};
}
