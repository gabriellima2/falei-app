import { renderHook } from "@testing-library/react-hooks";

import { useFilteredAppointments } from "./use-filtered-appointments";

import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";
import { time } from "@/helpers/time";

import type { BreathingExerciseAppointmentEntity } from "@/entities";

const defaultParams = [
	{
		id: "1",
		title: "any_title_schedule_1",
		scheduled_at: {
			days: [DAYS_OF_THE_WEEK[time.day]],
			hour: `${Number(time.hours) - 3}:00`,
		},
	},
	{
		id: "2",
		title: "any_title_schedule_2",
		scheduled_at: {
			days: [DAYS_OF_THE_WEEK[time.day]],
			hour: `${time.hours}:${time.minutes}`,
		},
	},
	{
		id: "3",
		title: "any_title_schedule_3",
		scheduled_at: {
			days: [DAYS_OF_THE_WEEK[time.day]],
			hour: `${Number(time.hours) - 1}:${time.minutes}`,
		},
	},
	{
		id: "4",
		title: "any_title_schedule_4",
		scheduled_at: { days: [DAYS_OF_THE_WEEK[time.nextDay]], hour: "10:00" },
	},
] as BreathingExerciseAppointmentEntity[];

const executeHook = (
	params: BreathingExerciseAppointmentEntity[] = defaultParams
) =>
	renderHook(() =>
		useFilteredAppointments<BreathingExerciseAppointmentEntity>(params)
	);

describe("useFilteredAppointments", () => {
	const isSaturday = time.day === 5; // to check if the week is over;
	const validResult = isSaturday
		? [defaultParams[1]]
		: [defaultParams[1], defaultParams[3]];
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should return today's appointment when you are at the scheduled time", () => {
		const { result } = executeHook();
		expect(result.current[0]).toMatchObject(validResult[0]);
	});
	it("should return upcoming appointments ignoring past appointments from the current day ordered by hour", () => {
		const { result } = executeHook();
		expect(result.current).toMatchObject(validResult);
	});
	it("should return empty when there are no appointments for the week", () => {
		const { result } = executeHook([]);
		expect(result.current).toMatchObject([]);
	});
});
