import { renderHook } from "@testing-library/react-hooks";

import { useWeekAppointments } from ".";
import type { BreathingAppointmentEntity } from "@/entities/breathing-entities";

const date = new Date();
const now = {
	day: date.getDay(),
	nextDay: date.getDay() === 6 ? 0 : date.getDay() + 1,
	previousDay: date.getDay() === 0 ? 6 : date.getDay() - 1,
	hour: date.getHours(),
	minutes: date.getMinutes(),
};

const defaultParams = [
	{
		id: "0",
		title: "any_title_schedule_0",
		scheduledAt: {
			days: [now.day],
			hour: Number(now.hour) - 3,
			minutes: 0,
		},
	},
	{
		id: "1",
		title: "any_title_schedule_1",
		scheduledAt: {
			days: [now.day],
			hour: now.hour,
			minutes: now.minutes,
		},
	},
	{
		id: "3",
		title: "any_title_schedule_3",
		scheduledAt: { days: [now.nextDay], hour: 10, minutes: 0 },
	},
	{
		id: "2",
		title: "any_title_schedule_2",
		scheduledAt: {
			days: [now.day],
			hour: Number(now.hour) - 1,
			minutes: now.minutes,
		},
	},
	{
		id: "4",
		title: "any_title_schedule_4",
		scheduledAt: { days: [now.previousDay], hour: 13, minutes: 0 },
	},
	{
		id: "5",
		title: "any_title_schedule_5",
		scheduledAt: {
			days: [now.previousDay, now.day],
			hour: now.hour === 23 ? 0 : now.hour + 1,
			minutes: 0,
		},
	},
] as unknown as BreathingAppointmentEntity[];

const executeHook = (params: BreathingAppointmentEntity[] = defaultParams) =>
	renderHook(() => useWeekAppointments<BreathingAppointmentEntity>(params));

describe("useWeekAppointments", () => {
	const isSunday = now.day === 0;
	const appointmentsForTheRestOfTheWeek = [
		defaultParams[0],
		defaultParams[3],
		defaultParams[1],
		defaultParams[5],
		defaultParams[2],
	];
	const appointmentsForTheWeek = [
		...appointmentsForTheRestOfTheWeek,
		defaultParams[4],
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();
			expect(typeof result.current).toBe("object");
		});
		it("should return today's appointment", () => {
			const { result } = executeHook();

			const expected = isSunday
				? appointmentsForTheWeek
				: appointmentsForTheRestOfTheWeek;

			expect(result.current).toMatchObject(expected);
		});
		it("should return empty when there are no appointments for the week", () => {
			const { result } = executeHook([]);
			expect(result.current).toMatchObject([]);
		});
	});
});
