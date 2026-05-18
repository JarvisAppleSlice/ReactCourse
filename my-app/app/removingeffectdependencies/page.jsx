"use client";

import Fix1 from "../../ui/removingeffectdependencies/reconnectingchat";
import Reconnecting2 from "../../ui/removingeffectdependencies/reconnectingchat2";
import IntervalReset from "../../ui/removingeffectdependencies/resettinginterval";
import AnimationReset from "../../ui/removingeffectdependencies/retriggeringanimation";

export default function App() {
	return (
		<>
			<IntervalReset />
			<hr />
			<AnimationReset />
			<hr />
			<Fix1 />
			<hr />
			<Reconnecting2 />
		</>
	);
}
