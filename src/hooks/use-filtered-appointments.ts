import { useMemo } from "react";

import { getDayOfTheWeek } from "@/helpers/get-day-of-the-week";
import { getCurrentTime } from "@/helpers/get-current-time";
import { formatHour } from "@/helpers/format-hour";

import type { BaseScheduledExerciseEntity } from "@/entities";

const date = new Date();

export function useFilteredAppointments<T extends BaseScheduledExerciseEntity>(
	appointments: T[]
) {
	const isTimeForAppointment = (currentHour: number, scheduledHour: string) => {
		const appointmentHour = new Date(
			`1970-01-01T${formatHour(scheduledHour)}Z`
		).getTime();
		return currentHour <= appointmentHour;
	};

	const hasAppointmentToday = (scheduledDays: string[], currentDay: string) => {
		return scheduledDays.some((day) => day === currentDay);
	};

	const getTodayAppointment = (appointment: T, appointmentDay: number) => {
		const currentDay = getDayOfTheWeek(appointmentDay);
		const currentHour = getCurrentTime();
		const { scheduled_at: scheduleDetails } = appointment;
		if (
			hasAppointmentToday(scheduleDetails.days, currentDay) &&
			isTimeForAppointment(currentHour, scheduleDetails.hour)
		) {
			return appointment;
		}
	};

	const getAppointmentForTheWeek = (appointment: T, appointmentDay: number) => {
		const { scheduled_at: scheduleDetails } = appointment;
		let nextDay = appointmentDay;
		while (nextDay <= 6) {
			const currentDay = getDayOfTheWeek(nextDay);
			if (hasAppointmentToday(scheduleDetails.days, currentDay)) {
				return appointment;
			}
			nextDay++;
		}
	};

	const orderAppointmentsByHour = (appointments: T[]) => {
		appointments.sort((current, next) => {
			return current.scheduled_at.hour.localeCompare(next.scheduled_at.hour);
		});
		return appointments;
	};

	const filteredAppointments = useMemo(() => {
		const { todayAppointments, appointmentsForTheWeek } = appointments.reduce(
			(acc, appointment) => {
				const todayAppointment = getTodayAppointment(
					appointment,
					date.getDay()
				);
				if (todayAppointment) {
					acc.todayAppointments.push(todayAppointment);
					return acc;
				}
				const appointmentForTheWeek = getAppointmentForTheWeek(
					appointment,
					date.getDay() + 1
				);
				if (appointmentForTheWeek) {
					acc.appointmentsForTheWeek.push(appointmentForTheWeek);
				}
				return acc;
			},
			{ todayAppointments: [] as T[], appointmentsForTheWeek: [] as T[] }
		);
		const orderedAppointmentsByHour = [
			todayAppointments,
			appointmentsForTheWeek,
		]
			.map(orderAppointmentsByHour)
			.flat();
		return orderedAppointmentsByHour;
	}, [appointments]);

	return filteredAppointments;
}
