import { useRouter } from "expo-router";

import { SendEmailFormProps } from "../components";
import { useAuthenticationStore } from "@/store/authentication-store";

type Credentials = Parameters<
	Pick<SendEmailFormProps, "resetPasswordService">["resetPasswordService"]
>[0];

export type UseSendEmailStateReturn = {
	handleResetPassword: (credentials: Credentials) => Promise<void>;
};

export function useSendEmailState() {
	const { resetPassword } = useAuthenticationStore((state) => state);
	const { replace } = useRouter();

	const handleResetPassword = async (credentials: Credentials) => {
		await resetPassword(credentials);
		replace("(auth)/(forgot-password)/check-your-email");
	};

	return {
		handleResetPassword,
	};
}
