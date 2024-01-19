import {
	ContainerWithDefaultSpaces,
	ScrollContainer,
	Skeletons,
} from "@/ui/atoms";

export const Skeleton = () => {
	return (
		<ScrollContainer isBottomTabRendered>
			<ContainerWithDefaultSpaces horizontalSpacing topSpacing>
				<Skeletons.Container>
					<Skeletons.Header
						titleLines={2}
						renderRight={() => <Skeletons.Button />}
					/>
					<Skeletons.Container>
						<Skeletons.Group>
							<Skeletons.List
								horizontal
								amount={4}
								renderItem={() => <Skeletons.Card width={330} />}
							/>
						</Skeletons.Group>
						<Skeletons.Group withRightText>
							<Skeletons.List
								horizontal
								amount={4}
								renderItem={() => (
									<Skeletons.Card width={320} height={75} radius="round" />
								)}
							/>
						</Skeletons.Group>
						<Skeletons.Group withRightText>
							<Skeletons.List
								horizontal
								amount={4}
								renderItem={() => <Skeletons.Card width={180} height={240} />}
							/>
						</Skeletons.Group>
					</Skeletons.Container>
				</Skeletons.Container>
			</ContainerWithDefaultSpaces>
		</ScrollContainer>
	);
};
