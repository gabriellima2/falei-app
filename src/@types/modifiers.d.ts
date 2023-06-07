import {
	DefaultTheme,
	type FlattenSimpleInterpolation,
} from "styled-components/native";

export type Modifiers<T> = Record<
	T,
	(theme: DefaultTheme) => FlattenSimpleInterpolation
>;
