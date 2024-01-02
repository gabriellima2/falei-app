import { forwardRef, useState } from "react";
import styled from "styled-components/native";

import { Field, type FieldProps } from "../Field";
import { ToggleVisibiltyButton } from "./components";

import type { InputRef } from "@/ui/atoms/Input";

export type PasswordFieldProps = FieldProps;
export type PasswordFieldRef = InputRef;

export const PasswordField = forwardRef<PasswordFieldRef, PasswordFieldProps>(
	(props, ref) => {
		const [isVisible, setIsVisible] = useState(false);
		return (
			<Container>
				<Field
					placeholder="8+ Caracteres"
					returnKeyType="send"
					autoCapitalize="none"
					{...props}
					ref={ref}
					secureTextEntry={!isVisible}
				/>
				<RightContent>
					<ToggleVisibiltyButton
						onPress={() => setIsVisible((prevState) => !prevState)}
						isVisible={isVisible}
					/>
				</RightContent>
			</Container>
		);
	}
);

PasswordField.displayName = "PasswordField";

const Container = styled.View``;

const RightContent = styled.View`
	position: absolute;
	right: 20px;
	top: 50%;
`;
