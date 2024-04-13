import { View } from "react-native";
import { Check, type CheckProps } from "@/ui/components/Check";

import type { DaysOfTheWeek } from "@/@types/days-of-the-week";

export type DayPickerProps = Pick<CheckProps, "onChange"> & {
	values: DaysOfTheWeek[];
};

const options: Pick<CheckProps, "items">["items"] = [
	{ name: "Dom", value: "0" },
	{ name: "Seg", value: "1" },
	{ name: "Ter", value: "2" },
	{ name: "Qua", value: "3" },
	{ name: "Qui", value: "4" },
	{ name: "Sex", value: "5" },
	{ name: "Sab", value: "6" },
];

export const DayPicker = (props: DayPickerProps) => {
	return (
		<View>
			<View style={{ gap: 16, flexDirection: "row", flexWrap: "wrap" }}>
				<Check
					{...props}
					optionStyle={{ maxWidth: 80, minWidth: 80 }}
					withMultipleValues
					withToggle
					items={options}
				/>
			</View>
		</View>
	);
};
