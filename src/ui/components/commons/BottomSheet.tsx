import { ReactNode, forwardRef, useMemo } from "react";
import BottomSheetLib, {
	useBottomSheetDynamicSnapPoints,
	type BottomSheetProps as BottomSheetLibProps,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import styled, { css, useTheme } from "styled-components/native";

type BottomSheetProps = Omit<BottomSheetLibProps, "snapPoints"> & {
	snapPoints?: (string | number)[];
};

export const BottomSheet = forwardRef<BottomSheetLib, BottomSheetProps>(
	(props, ref) => {
		const { snapPoints, children, ...rest } = props;
		const { colors } = useTheme();
		const defaultSnapPoints = useMemo(() => [1, "50%", "CONTENT_HEIGHT"], []);
		const {
			animatedHandleHeight,
			animatedSnapPoints,
			animatedContentHeight,
			handleContentLayout,
		} = useBottomSheetDynamicSnapPoints(snapPoints ?? defaultSnapPoints);

		return (
			<BottomSheetLib
				{...rest}
				ref={ref}
				index={0}
				snapPoints={animatedSnapPoints}
				handleHeight={animatedHandleHeight}
				contentHeight={animatedContentHeight}
				enablePanDownToClose
				backgroundStyle={{ backgroundColor: `${colors.utils.darkGray}` }}
				style={{ paddingVertical: 8, paddingHorizontal: 16 }}
				handleIndicatorStyle={{
					backgroundColor: colors.overlay,
					width: "40%",
					height: 8,
				}}
			>
				<BottomSheetScrollView onLayout={handleContentLayout}>
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
