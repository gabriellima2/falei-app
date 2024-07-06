import { Skeletons } from "@/ui/atoms";
import * as S from "../styles";

export function Skeleton() {
	return (
		<S.Container>
			<Skeletons.Block>
				<Skeletons.Text variant="paragraph" width="100%" />
				<Skeletons.Text variant="paragraph" width="100%" />
				<Skeletons.Text variant="paragraph" width="100%" />
				<Skeletons.Text variant="paragraph" width="75%" />
			</Skeletons.Block>
			<S.Footer>
				<Skeletons.Text variant="title" />
				<Skeletons.Text variant="small" />
			</S.Footer>
		</S.Container>
	);
}
