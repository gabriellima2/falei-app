import { useMemo } from "react";

import { getDiffInMinutesSinceMidnight } from "@/helpers/get-diff-in-minutes-since-midnight";
import { hasAppointmentToday } from "@/helpers/has-appointment-today";

import type { AppointmentEntity } from "@/entities/appointment.entity";

const date = new Date();

export function useWeekAppointments<T extends AppointmentEntity>(
	appointments: T[]
) {
	const getTodayAppointment = (appointment: T, appointmentDay: number) => {
		const { scheduledAt: scheduleDetails } = appointment;
		if (hasAppointmentToday(scheduleDetails.days, appointmentDay)) {
			return appointment;
		}
	};

	const getAppointmentForTheWeek = (appointment: T, appointmentDay: number) => {
		const { scheduledAt } = appointment;
		let nextDay = appointmentDay;
		while (nextDay <= 6) {
			if (hasAppointmentToday(scheduledAt.days, nextDay)) {
				return appointment;
			}
			nextDay++;
		}
	};

	const orderAppointments = (appointments: T[]) => {
		const orderByTime = (appointments: T[]) => {
			return appointments.sort((current, next) => {
				const currentTime = getDiffInMinutesSinceMidnight(
					current.scheduledAt.hour,
					current.scheduledAt.minutes
				);
				const nextTime = getDiffInMinutesSinceMidnight(
					next.scheduledAt.hour,
					next.scheduledAt.minutes
				);
				return currentTime - nextTime;
			});
		};
		const orderByDay = (appointments: T[]) => {
			return appointments.sort((current, next) => {
				const minCurrentDay = Math.min(...current.scheduledAt.days);
				const minNextDay = Math.min(...next.scheduledAt.days);
				return minCurrentDay - minNextDay;
			});
		};
		return orderByTime(orderByDay(appointments));
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
		const orderedAppointments = [todayAppointments, appointmentsForTheWeek]
			.map(orderAppointments)
			.flat();
		return orderedAppointments;
	}, [appointments]);

	return filteredAppointments;
}
