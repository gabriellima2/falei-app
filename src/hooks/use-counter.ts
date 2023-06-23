import { useState } from "react";

export type UseCounterParams = {
	initialValue?: number;
	maxValue?: number;
	minValue?: number;
};

export type UseCounterReturn = {
	count: number;
	decrement: () => void;
	increment: () => void;
	changeCount: (value: number) => void;
};

export function useCounter(params?: UseCounterParams): UseCounterReturn {
	const [count, setCount] = useState(params?.initialValue ?? 0);

	const increment = () => {
		if (params?.maxValue?.toString() && count === params.maxValue) return;
		setCount((prevState) => (prevState += 1));
	};

	const decrement = () => {
		if (params?.minValue?.toString() && count === params.minValue) return;
		setCount((prevState) => (prevState -= 1));
	};

	const changeCount = (value: number) => setCount(value);

	return {
		count,
		decrement,
		increment,
		changeCount,
	};
}
