type SetDateToNextWeekParams = {
	day: number;
	hour: number;
	minutes: number;
};

const TOTAL_DAYS_OF_THE_WEEK = 7;

function calcDateForDayOfTheNextWeek(date: Date, day: number) {
	const diffBetweenDays = day - date.getDay();
	const availableDays = TOTAL_DAYS_OF_THE_WEEK + diffBetweenDays - 1;
	const dayOfTheWeek = availableDays % TOTAL_DAYS_OF_THE_WEEK;
	return date.getDate() + dayOfTheWeek + 1;
}

export function setDateToNextWeek(params: SetDateToNextWeekParams): Date {
	const { day, hour, minutes } = params;
	const date = new Date();
	const customDate = new Date(date.getTime());
	customDate.setDate(calcDateForDayOfTheNextWeek(date, day));
	customDate.setHours(hour);
	customDate.setMinutes(minutes);
	customDate.setSeconds(0);
	return customDate;
}
