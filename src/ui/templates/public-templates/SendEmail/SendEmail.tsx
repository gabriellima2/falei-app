import { ContainerWithDefaultSpaces, Header, Typography } from "@/ui/atoms";

export const SendEmail = () => {
	return (
		<>
			<Header withBack />
			<ContainerWithDefaultSpaces horizontalSpacing>
				<Typography.Title>Sending...</Typography.Title>
			</ContainerWithDefaultSpaces>
		</>
	);
};
