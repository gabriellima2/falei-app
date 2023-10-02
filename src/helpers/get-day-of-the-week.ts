import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";

export function getDayOfTheWeek(day: number) {
	const isWeekOver = day === 7;
	return DAYS_OF_THE_WEEK[isWeekOver ? 0 : day];
}
