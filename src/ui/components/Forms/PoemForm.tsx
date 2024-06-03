import { type ReactNode } from "react";
import styled, { css } from "styled-components/native";
import { useRouter } from "expo-router";

import {
	BaseButton,
	ContainerWithDefaultSpaces,
	type BaseButtonProps,
	type ContainerWithDefaultSpacesProps,
	Form,
} from "@/ui/atoms";

type ContainerDefaultProps = Omit<
	ContainerWithDefaultSpacesProps,
	"children"
> & {
	children?: ReactNode | ReactNode[];
};

const Root = (props: ContainerDefaultProps) => (
	<Container horizontalSpacing {...props} />
);

const Content = (props: ContainerDefaultProps) => <Container {...props} />;

const CancelButton = (props: BaseButtonProps) => {
	const { onPress } = props;
	const { back } = useRouter();
	return (
		<BaseButton
			accessibilityLabel="Cancelar formulário"
			accessibilityHint="Cancela e volta para a página anterior"
			secondary
			{...props}
			onPress={(e) => {
				back();
				onPress && onPress(e);
			}}
		>
			{props.children ?? "Cancelar"}
		</BaseButton>
	);
};

const SubmitButton = (props: Parameters<typeof Form.Button>[0]) => (
	<Form.Button
		accessibilityLabel="Enviar formulário"
		accessibilityHint="O formulário atual será enviado"
		{...props}
	>
		{props.children ?? "Confirmar"}
	</Form.Button>
);

const Container = styled(ContainerWithDefaultSpaces)`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;

const Footer = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		gap: ${theme.spaces[3]};
	`}
`;

export const PoemForm = {
	Root,
	Content,
	CancelButton,
	SubmitButton,
	Footer,
};
