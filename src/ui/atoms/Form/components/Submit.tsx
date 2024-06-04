import { Button } from "./Button";

export const Submit = (props: Parameters<typeof Button>[0]) => (
	<Button
		accessibilityLabel="Enviar formulário"
		accessibilityHint="O formulário atual será enviado"
		{...props}
	>
		{props.children ?? "Confirmar"}
	</Button>
);
