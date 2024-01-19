import { Skeleton } from "moti/skeleton";
import type { SkeletonProps } from "@/@types/skeleton-props";

export type TextProps = SkeletonProps & {
	variant?: keyof typeof height;
};

const height = {
	title: 20,
	paragraph: 15,
	small: 10,
};

export const Text = (props: TextProps) => {
	const { variant = "paragraph", ...rest } = props;
	return (
		<Skeleton colorMode="dark" height={height[variant]} width={125} {...rest} />
	);
};
