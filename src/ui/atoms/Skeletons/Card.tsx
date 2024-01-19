import { Skeleton } from "moti/skeleton";
import type { SkeletonProps } from "@/@types/skeleton-props";

type CardProps = SkeletonProps;

export const Card = (props: CardProps) => {
	return <Skeleton colorMode="dark" height={196} width="100%" {...props} />;
};
