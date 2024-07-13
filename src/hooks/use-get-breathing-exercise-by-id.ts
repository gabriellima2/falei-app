import { useQuery } from "react-query";

import { makeBreathingService } from "@/factories/services/make-breathing-service";
import { BreathingExerciseEntity } from "@/entities/breathing-entities";

type Options = Omit<
	Parameters<typeof useQuery<BreathingExerciseEntity>>[2],
	"queryFn" | "queryKey" | "enabled"
>;

const service = makeBreathingService();

export function useGetBreathingExerciseById(id: string, options?: Options) {
	const { data, ...rest } = useQuery({
		queryFn: () => service.getById(id!),
		queryKey: ["breathing", id],
		enabled: !!id,
		...options,
	});
	return { breathing: data, ...rest };
}
