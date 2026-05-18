"use client";

import DelayedNotification from "../../ui/separatingeventsfromeffects/delayednotification";
import Freezing from "../../ui/separatingeventsfromeffects/freezingcounter";
import Adjustable from "../../ui/separatingeventsfromeffects/nonadjustibledelay";
import Reconnecting from "../../ui/separatingeventsfromeffects/reconnecting";

export default function App() {
	return (
		<>
			<Reconnecting />
			<hr />
			<Freezing />
			<hr />
			<Adjustable />
			<hr />
			<DelayedNotification />
		</>
	);
}
