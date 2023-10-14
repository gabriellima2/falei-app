import { getDayOfTheWeek } from "./get-day-of-the-week";

export function hasAppointmentToday(
	days: string[],
	day: number = new Date().getDay()
) {
	const currentDay = getDayOfTheWeek(day);
	return days.some((day) => day === currentDay);
}
