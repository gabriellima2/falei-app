import { renderHook } from "@testing-library/react-hooks";

import { useWeekAppointments } from "./use-week-appointments";
import type { BreathingAppointmentEntity } from "@/entities/breathing-entities";

const date = new Date();
const now = {
	day: date.getDay(),
	nextDay: date.getDay() === 6 ? 0 : date.getDay() + 1,
	hour: date.getHours(),
	minutes: date.getMinutes(),
};

const defaultParams = [
	{
		id: "1",
		title: "any_title_schedule_1",
		scheduledAt: {
			days: [now.day],
			hour: Number(now.hour) - 3,
			minutes: 0,
		},
	},
	{
		id: "2",
		title: "any_title_schedule_2",
		scheduledAt: {
			days: [now.day],
			hour: now.hour,
			minutes: now.minutes,
		},
	},
	{
		id: "3",
		title: "any_title_schedule_3",
		scheduledAt: {
			days: [now.day],
			hour: Number(now.hour) - 1,
			minutes: now.minutes,
		},
	},
	{
		id: "4",
		title: "any_title_schedule_4",
		scheduledAt: { days: [now.nextDay], hour: 10, minutes: 0 },
	},
] as unknown as BreathingAppointmentEntity[];

const executeHook = (params: BreathingAppointmentEntity[] = defaultParams) =>
	renderHook(() => useWeekAppointments<BreathingAppointmentEntity>(params));

describe("useWeekAppointments", () => {
	const WEEK_IS_NOT_OVER = now.day <= 5; // 5 === Saturday
	const validResult = WEEK_IS_NOT_OVER
		? [defaultParams[1], defaultParams[3]]
		: [defaultParams[1]];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			const { result } = executeHook();

			expect(typeof result.current).toBe("object");
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
});
