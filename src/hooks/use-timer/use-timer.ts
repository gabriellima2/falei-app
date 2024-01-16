import { useEffect, useState } from "react";

export type UseTimerParams = {
	initialValue?: number;
};

export type UseTimerReturn = {
	timer: number;
	defineTimer: () => void;
	resetTimer: () => void;
};

let interval: NodeJS.Timeout;

export function useTimer(params: UseTimerParams) {
	const { initialValue = 20 } = params;
	const [timer, setTimer] = useState(initialValue);

	const defineTimer = (ms = 1000) => {
		clearInterval(interval);
		interval = setInterval(() => {
			if (timer <= 0) return clearInterval(interval);
			setTimer((prevState) => {
				if (prevState === 0) return prevState;
				return (prevState -= 1);
			});
		}, ms);
	};

	const resetTimer = () => setTimer(initialValue);

	useEffect(() => {
		defineTimer();
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (timer === initialValue) return defineTimer();
	}, [timer]);

	return {
		timer,
		defineTimer,
		resetTimer,
	};
}
