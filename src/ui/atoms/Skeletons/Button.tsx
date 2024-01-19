import { Skeleton } from "moti/skeleton";
import type { SkeletonProps } from "@/@types/skeleton-props";

type ButtonProps = SkeletonProps & {
	variant?: keyof typeof variants;
};

const variants = {
	square: {
		width: 48,
		height: 48,
	},
	rectangle: {
		width: "100%",
		height: 48,
	},
};

export const Button = (props: ButtonProps) => {
	const { variant = "square", ...rest } = props;
	return <Skeleton colorMode="dark" {...variants[variant]} {...rest} />;
};
