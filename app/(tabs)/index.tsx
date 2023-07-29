import { Typography } from "@/components";
import { ProtectScreen } from "@/hocs";

function Page() {
	return <Typography.Title>Private Home</Typography.Title>;
}

export default ProtectScreen(Page);
