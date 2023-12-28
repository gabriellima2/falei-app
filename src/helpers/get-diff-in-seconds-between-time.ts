import { transformTimeIntoSeconds } from "./transform-time-into-seconds";

type GetDiffInSecondsBetweenTimeParams = {
	hour: number;
	minutes: number;
};

export function getDiffInSecondsBetweenTime(
	params: GetDiffInSecondsBetweenTimeParams
) {
	const { hour, minutes } = params;
	const date = new Date();
	const currentTimeInSeconds = transformTimeIntoSeconds(
		date.getHours(),
		date.getMinutes()
	);
	const scheduledTimeInSeconds = transformTimeIntoSeconds(hour, minutes);
	const differenceInSeconds =
		scheduledTimeInSeconds - currentTimeInSeconds - date.getSeconds();
	return differenceInSeconds;
}
