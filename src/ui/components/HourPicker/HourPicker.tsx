import { useState } from "react";
import DateTimePicker, {
	type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import styled, { css } from "styled-components/native";

import { BaseButton } from "../../atoms/Buttons";
import { Typography } from "../../atoms/Typography";

type HourPickerProps = {
	value: Date;
	onHourChange: (date?: Date) => void;
};

export const HourPicker = (props: HourPickerProps) => {
	const { value, onHourChange } = props;
	const [showPicker, setShowPicker] = useState(false);

	const handleTimeChange = (_: DateTimePickerEvent, date?: Date) => {
		onHourChange(date);
		setShowPicker(false);
	};

	const handleShow = () => setShowPicker(true);

	return (
		<Container>
			<Description>
				<Label>Hora</Label>
				<Typography.Paragraph>
					{value
						? value.toLocaleTimeString().replace(/(.*)\D\d+/, "$1")
						: "Nenhuma hora definida"}
				</Typography.Paragraph>
			</Description>
			<Button secondary onPress={handleShow}>
				Definir Hora
			</Button>
			{showPicker && (
				<DateTimePicker mode="time" value={value} onChange={handleTimeChange} />
			)}
		</Container>
	);
};

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
