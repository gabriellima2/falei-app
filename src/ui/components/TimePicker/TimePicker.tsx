import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import styled, { css } from "styled-components/native";

import { useTimePicker } from "./hooks/use-time-picker";

import { BaseButton } from "../../atoms/Buttons";
import { Typography } from "../../atoms/Typography";

export type TimePickerProps = {
	value: Date;
	onChange: (date?: Date) => void;
};

export const TimePicker = React.memo((props: TimePickerProps) => {
	const { value, onChange } = props;
	const { isShowPicker, showPicker, handleTimeChange } = useTimePicker();
	const TIME_WITHOUT_SECONDS = value
		.toLocaleTimeString()
		.replace(/(.*)\D\d+/, "$1");
	return (
		<Container>
			<Description>
				<Label>Hora</Label>
				<Typography.Paragraph>{TIME_WITHOUT_SECONDS}</Typography.Paragraph>
			</Description>
			<Button secondary onPress={showPicker}>
				Definir Hora
			</Button>
			{isShowPicker && (
				<DateTimePicker
					mode="time"
					value={value}
					onChange={(_, date) => handleTimeChange(date, onChange)}
				/>
			)}
		</Container>
	);
});

TimePicker.displayName = "TimePicker";

const Container = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: ${theme.spaces[5]};
	`}
`;

const Description = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[2]};
	`}
`;

const Label = styled(Typography.Title)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.regular};
	`}
`;

const Button = styled(BaseButton)`
	${({ theme }) => css`
		width: 144px;
		max-width: 144px;
		min-width: 144px;
		height: 44px;
		max-height: 44px;
		min-height: 44px;
		border-radius: ${theme.rounded.regular};
		padding: ${theme.spaces[1]} ${theme.spaces[3]};
	`}
`;
