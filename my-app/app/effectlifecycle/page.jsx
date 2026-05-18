"use client";

import Reconnection from "@/ui/effectlifecycle/reconnecting";
import SwitchSync from "../../UI/effectlifecycle/switchsync";
import StaleBug from "../../UI/effectlifecycle/stalevalue";
import ConnectionSwitch from "../../UI/effectlifecycle/connectionswitch";
import ChainOfSelect from "../../UI/effectlifecycle/chainofselect";

export default function App() {
	return (
		<>
			<Reconnection />
			<hr />
			<SwitchSync />
			<hr />
			<StaleBug />
			<hr />
			<ConnectionSwitch />
			<hr />
			<ChainOfSelect />
		</>
	);
}
