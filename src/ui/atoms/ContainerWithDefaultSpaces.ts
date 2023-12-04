import { Platform, NativeModules } from "react-native";
import styled, { css } from "styled-components/native";

import type { Modifiers } from "@/@types/modifiers";

type ContainerWithDefaultSpacesProps = {
	horizontalSpacing?: boolean;
	verticalSpacing?: boolean;
	topSpacing?: boolean;
	bottomSpacing?: boolean;
	leftSpacing?: boolean;
	rightSpacing?: boolean;
};

const STATUSBAR_HEIGHT =
	Platform.OS === "ios" ? 16 : NativeModules.StatusBarManager.HEIGHT + 16;

const modifiers: Modifiers<keyof ContainerWithDefaultSpacesProps> = {
	horizontalSpacing: (theme) => css`
		padding-left: ${theme.spaces[3]};
		padding-right: ${theme.spaces[3]};
	`,
	verticalSpacing: (theme) => css`
		padding-top: ${STATUSBAR_HEIGHT}px;
		padding-bottom: ${theme.spaces[3]};
	`,
	topSpacing: () => css`
		padding-top: ${STATUSBAR_HEIGHT}px;
	`,
	bottomSpacing: (theme) => css`
		padding-bottom: ${theme.spaces[3]};
	`,
	leftSpacing: (theme) => css`
		padding-left: ${theme.spaces[3]};
	`,
	rightSpacing: (theme) => css`
		padding-right: ${theme.spaces[3]};
	`,
};

export const ContainerWithDefaultSpaces = styled.View<ContainerWithDefaultSpacesProps>`
	${({
		theme,
		horizontalSpacing,
		verticalSpacing,
		topSpacing,
		bottomSpacing,
		leftSpacing,
		rightSpacing,
	}) => css`
		${horizontalSpacing && modifiers.horizontalSpacing(theme)};
		${verticalSpacing && modifiers.verticalSpacing(theme)};
		${topSpacing && modifiers.topSpacing(theme)};
		${bottomSpacing && modifiers.bottomSpacing(theme)};
		${leftSpacing && modifiers.leftSpacing(theme)};
		${rightSpacing && modifiers.rightSpacing(theme)};
	`}
`;
