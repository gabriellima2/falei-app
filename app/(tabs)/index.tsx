import { Home } from "@/ui/screens";
import { ProtectScreen } from "@/hocs";

function Page() {
	return <Home data={{ appointments: [], exercises: [] }} />;
}

export default ProtectScreen(Page);
