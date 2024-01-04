import { ArrowRight } from "lucide-react-native";

import { EmailField } from "@/ui/components";
import { Form } from "@/ui/atoms";

export const SendEmailForm = () => {
	return (
		<Form.Root>
			<EmailField />
			<Form.Button rightIcon={(props) => <ArrowRight {...props} />}>
				Continuar
			</Form.Button>
		</Form.Root>
	);
};
