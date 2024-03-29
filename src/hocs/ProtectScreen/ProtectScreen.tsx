import { useEffect, type ComponentType } from "react";
import {
	usePathname,
	useRootNavigationState,
	useRouter,
	useSegments,
} from "expo-router";

import { useAuthenticationStore } from "@/store/authentication-store";
import { Splash } from "@/ui/atoms";

import { PRIVATE_GROUP_NAME, PUBLIC_GROUP_NAME } from "./constants/group-names";

export function ProtectScreen<P extends {}>(Component: ComponentType<P>) {
	return function HOC(props: P) {
		const router = useRouter();
		const segments = useSegments();
		const pathname = usePathname();
		const { user, checkAuthState, authHasBeenChecked } = useAuthenticationStore(
			(state) => state
		);
		const navigationState = useRootNavigationState();

		const handleRedirect = () => {
			const inPublicGroup = segments[0] === PUBLIC_GROUP_NAME;
			const inPrivateGroup = segments[0] === PRIVATE_GROUP_NAME;
			const inRootPath = pathname === "/";

			if (user && !user.emailVerified) {
				return router.replace(`/${PUBLIC_GROUP_NAME}/email-verification`);
			}

			if (user && inRootPath && !inPrivateGroup) {
				return router.replace(`/${PRIVATE_GROUP_NAME}/`);
			}

			if (!user && inPrivateGroup && !inPublicGroup) {
				return router.replace(`/${PUBLIC_GROUP_NAME}/login`);
			}
		};

		useEffect(() => {
			const unsubscribe = checkAuthState();
			return unsubscribe;
		}, []);

		useEffect(() => {
			if (!navigationState) return;
			handleRedirect();
		}, [authHasBeenChecked]);

		if (!authHasBeenChecked) return <Splash />;
		return <Component {...props} />;
	};
}
