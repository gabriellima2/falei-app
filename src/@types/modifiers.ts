import { FlattenSimpleInterpolation } from "styled-components";
import { DefaultTheme } from "styled-components/native";

export type Modifiers<T extends string> = Record<
	T,
	(theme: DefaultTheme) => FlattenSimpleInterpolation
>;
