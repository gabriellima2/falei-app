export function hasAppointmentToday(
	days: number[],
	dayToCampare = new Date().getDay()
) {
	return days.some((day) => day === dayToCampare);
}
