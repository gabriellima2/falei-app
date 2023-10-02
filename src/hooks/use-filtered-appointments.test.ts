import { renderHook } from "@testing-library/react-hooks";

import { useFilteredAppointments } from "./use-filtered-appointments";

import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";
import type { ScheduledBreathingExerciseEntity } from "@/entities";

const date = new Date();
const time = {
	day: date.getDay(),
	hours: date.getHours().toString().padStart(2, "0"),
	minutes: date.getMinutes().toString().padStart(2, "0"),
};

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
		scheduled_at: { days: [DAYS_OF_THE_WEEK[5]], hour: "14:00" },
	},
	{
		id: "4",
		title: "any_title_schedule_4",
		scheduled_at: { days: [DAYS_OF_THE_WEEK[5]], hour: "10:00" },
	},
] as ScheduledBreathingExerciseEntity[];

const executeHook = (
	params: ScheduledBreathingExerciseEntity[] = defaultParams
) =>
	renderHook(() =>
		useFilteredAppointments<ScheduledBreathingExerciseEntity>(params)
	);

describe("useFilteredAppointments", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should return today's appointment when you are at the scheduled time", () => {
		const { result } = executeHook();
		expect(result.current[0]).toMatchObject(defaultParams[1]);
	});
	it("should return upcoming appointments ignoring past appointments from the current day ordered by hour", () => {
		const { result } = executeHook();
		expect(result.current).toMatchObject([
			defaultParams[1],
			defaultParams[3],
			defaultParams[2],
		]);
	});
	it("should return empty when there are no appointments for the week", () => {
		const { result } = executeHook([]);
		expect(result.current).toMatchObject([]);
	});
});
