import { getDiffInSecondsBetweenDays } from "./get-diff-in-seconds-between-days";
import { getDiffInSecondsBetweenTime } from "./get-diff-in-seconds-between-time";

type GetDiffInSecondsBasedOnDateParams = {
	day: number;
	hour: number;
	minutes: number;
};

export function getDiffInSecondsBasedOnDate(
	params: GetDiffInSecondsBasedOnDateParams
) {
	const { day, hour, minutes } = params;
	const date = new Date();
	const isValidTime = hour >= date.getHours() && minutes > date.getMinutes();
	const isScheduleToday = date.getDay() === day;
	if (isScheduleToday && isValidTime) {
		return getDiffInSecondsBetweenTime({ hour, minutes });
	}
	return getDiffInSecondsBetweenDays({ day, hour, minutes });
}
