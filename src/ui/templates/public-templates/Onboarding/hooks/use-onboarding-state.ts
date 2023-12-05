import { useRouter } from "expo-router";

import { useCounter } from "@/hooks";
import { defaultItems } from "../constants/default-items";

type UseOnboardingStateReturn = {
	currentItem: number;
	isFirst: boolean;
	isLast: boolean;
	handleBackPress: () => void;
	handleForwardPress: () => void;
	handleCurrentItemChange: (item: number) => void;
};

const ITEMS_AMOUNT = defaultItems.length - 1;

export function useOnboardingState(): UseOnboardingStateReturn {
	const { push } = useRouter();
	const { count, decrement, increment, changeCount } = useCounter({
		initialValue: 0,
		maxValue: ITEMS_AMOUNT,
		minValue: 0,
	});

	const isFirst = count === 0;
	const isLast = count === ITEMS_AMOUNT;

	const handleForwardPress = () => {
		if (isLast) return push("/create-account");
		increment();
	};

	const handleCurrentItemChange = (item: number) => changeCount(item);

	return {
		currentItem: count,
		isLast,
		isFirst,
		handleForwardPress,
		handleBackPress: decrement,
		handleCurrentItemChange,
	};
}
