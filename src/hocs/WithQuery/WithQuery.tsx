import { ComponentType } from "react";
import { useQuery } from "react-query";

import { LoadingIndicator, TextError } from "@/components";

type Query<T> = {
	name: string;
	fn: () => Promise<T>;
};

export type WithQueryInjectProps<T> = {
	data: T;
};

export function WithQuery<P extends {}, T>(
	Component: ComponentType<P & WithQueryInjectProps<T>>,
	query: Query<T>
) {
	return function HOC(props: P) {
		const { data, error, isLoading } = useQuery<T>(query.name, query.fn);

		if (isLoading) return <LoadingIndicator />;
		if (error) return <TextError>{(error as Error).message}</TextError>;
		if ((!error || !isLoading) && !data)
			return <TextError>Erro inesperado</TextError>;

		return <Component {...props} data={data as T} />;
	};
}