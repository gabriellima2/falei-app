import { useRouter } from "expo-router";

import { useCounter } from "@/hooks";
import { onboardingItems } from "../assets/onboarding-items";

const dataAmount = onboardingItems.length - 1;

export function useOnboarding() {
	const { push } = useRouter();
	const { count, decrement, increment, changeCount } = useCounter({
		initialValue: 0,
		maxValue: dataAmount,
		minValue: 0,
	});

	const isFirst = count === 0;
	const isLast = count === dataAmount;

	const next = () => {
		if (isLast) return push("/create-account");
		increment();
	};

	return {
		currentItem: count,
		isLast,
		isFirst,
		next,
		back: decrement,
		navigateTo: changeCount,
	};
}
