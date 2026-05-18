"use client";

import Counter2 from "../../ui/customhooks/counterdelay";
import Counter3 from "../../ui/customhooks/extractoutuseinterval";
import Counter1 from "../../ui/customhooks/extractoutuseinterval";
import Counter4 from "../../ui/customhooks/resettinginterval";
import Canvas1 from "../../ui/customhooks/staggeringmovement";

export default function App() {
	return (
		<>
			<Counter1 />
			<hr />
			<Counter2 />
			<hr />
			<Counter3 />
			<hr />
			<Counter4 />
			<hr />
			<Canvas1 />
		</>
	);
}
