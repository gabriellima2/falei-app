import styled from "styled-components/native";

import { TimePicker } from "./TimePicker";
import { DayPicker } from "./DayPicker";

const Root = styled.View`
	flex-direction: column;
	gap: 32px;
`;

export const Reminder = {
	Root,
	Time: TimePicker,
	Day: DayPicker,
};
