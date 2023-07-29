import { ComponentType } from "react";

import { Splash } from "@/components";

import { useEffect } from "react";
import {
	usePathname,
	useRootNavigationState,
	useRouter,
	useSegments,
} from "expo-router";

import { useAuthStore } from "@/store/auth-store";
import { PRIVATE_GROUP_NAME, PUBLIC_GROUP_NAME } from "./constants/group-names";

export function ProtectScreen<P extends {}>(Component: ComponentType<P>) {
	return function HOC(props: P) {
		const router = useRouter();
		const segments = useSegments();
		const pathname = usePathname();
		const { user, checkAuthState, authHasBeenChecked } = useAuthStore(
			(state) => state
		);
		const navigationState = useRootNavigationState();

		const handleRedirect = () => {
			const inPublicGroup = segments[0] === PUBLIC_GROUP_NAME;
			const inPrivateGroup = segments[0] === PRIVATE_GROUP_NAME;
			const inRootPath = pathname === "/";

			if (user && inRootPath && !inPrivateGroup)
				return router.replace(`/${PRIVATE_GROUP_NAME}/`);

			if (!user && inPrivateGroup && !inPublicGroup)
				return router.replace(`/${PUBLIC_GROUP_NAME}/login`);
		};

		useEffect(() => {
			const unsubscribe = checkAuthState();
			return unsubscribe;
		}, []);

		useEffect(() => {
			if (!navigationState) return;
			handleRedirect();
		}, [user, router, navigationState]);

		if (!authHasBeenChecked) return <Splash />;
		return <Component {...props} />;
	};
}
