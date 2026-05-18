import { useEffect } from "react";
import { useState } from "react";

function useCounter(delay) {
	const [count, setCount] = useState(0);
	useInterval(() => {
		setCount((c) => c + 1);
	}, delay);
	return count;
}

function useInterval(onTick, delay) {
	useEffect(() => {
		const id = setInterval(onTick, delay);
		return () => clearInterval(id);
	}, [onTick, delay]);
}

export default function Counter3() {
	const count = useCounter(1000);
	return <h1>Seconds passed: {count}</h1>;
}
