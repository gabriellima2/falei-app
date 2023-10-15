const date = new Date();
const hours = date.getHours().toString().padStart(2, "0");
const minutes = date.getMinutes().toString().padStart(2, "0");

export const time = {
	day: date.getDay(),
	nextDay: date.getDay() === 6 ? 0 : date.getDay() + 1,
	hour: `${hours}:${minutes}`,
	hours,
	minutes,
};
