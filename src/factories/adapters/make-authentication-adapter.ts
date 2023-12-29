import { AuthenticationAdapterImpl } from "@/adapters/impl/authentication.adapter.impl";

export const makeAuthenticationAdapter = () => {
	return new AuthenticationAdapterImpl();
};
