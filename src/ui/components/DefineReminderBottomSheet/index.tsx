import { forwardRef } from "react";
import { Redirect } from "expo-router";

import { BottomSheet } from "../BottomSheet";
import { Reminder } from "../Reminder";
import { Form } from "@/ui/atoms";

import { useCreateReminderForm } from "./hooks/use-create-reminder-form";
import { useAuthenticationStore } from "@/store/authentication-store";
import { useCreateReminder } from "./hooks/use-create-reminder";

import type { DaysOfTheWeek } from "@/@types/days-of-the-week";
import type { BottomSheetEl } from "@/@types/bottom-sheet-el";

type DefineReminderBottomSheetProps = {
	onClose?: () => void;
};

export const DefineReminderBottomSheet = forwardRef<
	BottomSheetEl,
	DefineReminderBottomSheetProps
>((props, ref) => {
	const { onClose } = props;
	const user = useAuthenticationStore((state) => state.user);
	const { handleCreate } = useCreateReminder({ onSuccess: onClose });
	const { fields, isSubmitting, setValue, handleSubmit } =
		useCreateReminderForm();
	if (!user) return <Redirect href="/(auth)/login" />;
	return (
		<BottomSheet ref={ref}>
			<Form.Root>
				<Form.Content>
					<Reminder.Root>
						<Reminder.Day
							values={(fields.days || []) as DaysOfTheWeek[]}
							onChange={(days) => setValue("days", days as DaysOfTheWeek[])}
						/>
						<Reminder.Time
							value={fields.time || new Date()}
							onChange={(date) => setValue("time", date ?? new Date())}
						/>
					</Reminder.Root>
				</Form.Content>
				<Form.Footer>
					<Form.Buttons.Cancel onPress={onClose} />
					<Form.Buttons.Submit
						isSubmitting={isSubmitting}
						onPress={handleSubmit((values) => handleCreate(user.id, values))}
					/>
				</Form.Footer>
			</Form.Root>
		</BottomSheet>
	);
});

DefineReminderBottomSheet.displayName = "DefineReminderBottomSheet";
