import { useEffect, useState } from "react";

import { useHandleServiceError } from "@/hooks/use-handle-service-error";
import { useAuthenticationStore } from "@/store/authentication-store";
import { useTimer } from "@/hooks/use-timer";

export function useEmailVerificationState() {
	const [isSendingTheEmail, setIsSendingTheEmail] = useState(false);
	const { emailVerification } = useAuthenticationStore((state) => state);
	const { timer, resetTimer } = useTimer({ initialValue: 60 });
	const { handleServiceError } = useHandleServiceError();

	const sendEmailVerification = async () => {
		setIsSendingTheEmail(true);
		try {
			await emailVerification();
		} catch (err) {
			handleServiceError(err);
		} finally {
			setIsSendingTheEmail(false);
		}
	};

	const handleSendEmailVerification = async () => {
		await sendEmailVerification();
		resetTimer();
	};

	useEffect(() => {
		(async () => {
			await sendEmailVerification();
		})();
	}, []);

	return {
		timer,
		isSendingTheEmail,
		handleSendEmailVerification,
	};
}
