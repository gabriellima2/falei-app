import { useRouter } from "expo-router";
import { SendEmailFormProps } from "../components";

type Credentials = Parameters<
	Pick<SendEmailFormProps, "resetPasswordService">["resetPasswordService"]
>[0];

export type UseSendEmailStateParams = SendEmailFormProps;

export type UseSendEmailStateReturn = {
	handleResetPassword: (credentials: Credentials) => Promise<void>;
};

export function useSendEmailState(params: UseSendEmailStateParams) {
	const { resetPasswordService } = params;
	const { replace } = useRouter();

	const handleResetPassword = async (credentials: Credentials) => {
		await resetPasswordService(credentials);
		replace("(auth)/(forgot-password)/check-your-email");
	};

	return {
		handleResetPassword,
	};
}
