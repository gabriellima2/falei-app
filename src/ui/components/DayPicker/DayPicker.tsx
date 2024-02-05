import { View } from "react-native";
import { Check, type CheckProps } from "@/ui/components/Check";

import type { DaysOfTheWeek } from "@/@types/days-of-the-week";

export type DayPickerProps = Pick<CheckProps, "onChange"> & {
	values: DaysOfTheWeek[];
};

export const DayPicker = (props: DayPickerProps) => {
	return (
		<View>
			<View style={{ gap: 16, flexDirection: "row", flexWrap: "wrap" }}>
				<Check
					{...props}
					optionStyle={{ maxWidth: 80, minWidth: 80 }}
					withMultipleValues
					withToggle
					items={[
						{ name: "Dom", value: "sunday" },
						{ name: "Seg", value: "monday" },
						{ name: "Ter", value: "tuesday" },
						{ name: "Qua", value: "wednesday" },
						{ name: "Qui", value: "thursday" },
						{ name: "Sex", value: "friday" },
						{ name: "Sab", value: "saturday" },
					]}
				/>
			</View>
		</View>
	);
};
