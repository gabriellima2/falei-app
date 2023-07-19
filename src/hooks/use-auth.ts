import React, { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { firebaseAuth } from "@/helpers/firebase-auth";

export function useAuth() {
	const [user, setUser] = React.useState<User>();

	useEffect(() => {
		const unsubscribeFromAuthStateChanged = onAuthStateChanged(
			firebaseAuth,
			(user) => setUser(user ?? undefined)
		);
		return unsubscribeFromAuthStateChanged;
	}, []);

	return {
		user,
	};
}
