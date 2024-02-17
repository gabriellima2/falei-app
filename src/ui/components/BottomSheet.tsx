import { ReactNode, forwardRef } from "react";
import styled, { css, useTheme } from "styled-components/native";
import BottomSheetLib, {
	BottomSheetScrollView,
	type BottomSheetProps as BottomSheetLibProps,
} from "@gorhom/bottom-sheet";

type BottomSheetProps = Omit<BottomSheetLibProps, "snapPoints"> & {
	snapPoints?: (string | number)[];
};

export const BottomSheet = forwardRef<BottomSheetLib, BottomSheetProps>(
	(props, ref) => {
		const { children, ...rest } = props;
		const { colors } = useTheme();
		return (
			<BottomSheetLib
				{...rest}
				ref={ref}
				detached
				enableDynamicSizing
				enablePanDownToClose
				backgroundStyle={{ backgroundColor: colors.utils.darkGray }}
				handleIndicatorStyle={{
					backgroundColor: colors.overlay,
					width: 44,
					height: 6,
					marginTop: 4,
				}}
			>
				<BottomSheetScrollView
					contentContainerStyle={{ paddingHorizontal: 16 }}
				>
					<Content>{children as ReactNode}</Content>
				</BottomSheetScrollView>
			</BottomSheetLib>
		);
	}
);

BottomSheet.displayName = "BottomSheet";

const Content = styled.View`
	${({ theme }) => css`
		padding-bottom: ${theme.spaces[2]};
	`}
`;
