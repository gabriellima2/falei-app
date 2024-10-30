import type { ComponentType } from 'react'
import { Redirect, type Href } from 'expo-router'

import { useAuthenticationStore } from '@/store/authentication-store'

import { SCREEN_ROLES } from '@/constants/keys'
import { ROUTES } from '@/constants/routes'

import type { ScreenRoles } from '@/@types/general'

type ProtectScreenProps = {
	screenRole: ScreenRoles
}

export function ProtectScreen<P extends {}>(
		Component: ComponentType<P>,
		props: ProtectScreenProps,
	) {
		return function HOC(p: P) {
			const { screenRole } = props
			const { user } = useAuthenticationStore((state) => state)

			if (screenRole === SCREEN_ROLES.PUBLIC && !!user) {
				return <Redirect href={ROUTES.TABS.HOME as Href} />
			}

			if (screenRole === SCREEN_ROLES.PRIVATE && !user) {
				return <Redirect href={ROUTES.AUTH.SIGN_IN as Href} />
			}

			return <Component {...p} />
		}
	}
