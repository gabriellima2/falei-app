import styled from "styled-components/native";

import { HourPicker } from "./HourPicker";
import { DayPicker } from "./DayPicker";

const Root = styled.View`
	flex-direction: column;
	gap: 32px;
`;

export const Reminder = {
	Root,
	Hour: HourPicker,
	Day: DayPicker,
};
