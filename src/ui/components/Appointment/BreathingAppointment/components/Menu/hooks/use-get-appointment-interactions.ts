import { useToastContext } from "@/contexts/ToastContext";

import { makeReminderService } from "@/factories/services/make-reminder-service";

import { interactions } from "../constants/interactions";
import { UNEXPECTED_ERROR } from "@/errors";

import { queryClient } from "@/lib/query-client";

type UseGetAppointmentInteractionsParams = {
	appointmentId: string;
	notificationId: string;
};

const service = makeReminderService();

export function useGetAppointmentInteractions(
	params: UseGetAppointmentInteractionsParams
) {
	const { appointmentId, notificationId } = params;
	const { notify } = useToastContext();

	async function handleRemoveReminder() {
		try {
			await service.delete(appointmentId, notificationId);
			notify("Lembrete deletado com sucesso", { type: "success" });
			queryClient.invalidateQueries({ queryKey: ["breathing-exercises"] });
		} catch (error) {
			const _error = (error as Error).message || UNEXPECTED_ERROR;
			notify(_error, { type: "alert" });
		}
	}

	function getInteractions() {
		return [{ ...interactions.remove, onPress: handleRemoveReminder }];
	}

	return getInteractions();
}
