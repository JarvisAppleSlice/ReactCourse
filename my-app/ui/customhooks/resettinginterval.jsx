import { useEffect } from "react";
import { useState } from "react";
import { useEffectEvent } from "react";

function useInterval(callback, delay) {
	const onTick = useEffectEvent(callback);
	useEffect(() => {
		const id = setInterval(onTick, delay);
		return () => clearInterval(id);
	}, [delay]);
}

function useCounter(delay) {
	const [count, setCount] = useState(0);
	useInterval(() => {
		setCount((c) => c + 1);
	}, delay);
	return count;
}

export default function Counter4() {
	const count = useCounter(1000);

	useInterval(() => {
		const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
		document.body.style.backgroundColor = randomColor;
	}, 2000);

	return <h1>Seconds passed: {count}</h1>;
}
