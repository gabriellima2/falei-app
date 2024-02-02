import { View } from "react-native";
import { Check } from "@/ui/components";

type DayPickerProps = {
	onDayChange: (selectedDays: string[]) => void;
};

export const DayPicker = (props: DayPickerProps) => {
	const { onDayChange } = props;
	return (
		<View>
			<View style={{ gap: 16, flexDirection: "row", flexWrap: "wrap" }}>
				<Check
					initialValue="sunday"
					multipleValues
					toggle
					optionStyle={{ maxWidth: 80, minWidth: 80 }}
					onChange={onDayChange}
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
