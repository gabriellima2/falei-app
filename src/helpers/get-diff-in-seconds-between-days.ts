import { setDateToNextWeek } from "./set-date-to-next-week";

type GetDiffInSecondsBetweenDaysParams = {
	day: number;
	hour: number;
	minutes: number;
};

const MILLISECONDS = 1000;

export function getDiffInSecondsBetweenDays(
	params: GetDiffInSecondsBetweenDaysParams
) {
	const date = new Date();
	const scheduledDate = setDateToNextWeek(params);
	const now = new Date().getTime();
	const scheduled = scheduledDate.getTime();
	const differenceInSeconds =
		(scheduled - now) / MILLISECONDS - date.getSeconds();
	return differenceInSeconds;
}
