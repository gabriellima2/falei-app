import { Home } from "@/screens";
import { ProtectScreen } from "@/hocs";

function Page() {
	return <Home />;
}

export default ProtectScreen(Page);
