"use client";
import { useState } from "react";

// Fix a request counter
//--------------------
// export default function RequestTracker() {
// 	const [pending, setPending] = useState(0);
// 	const [completed, setCompleted] = useState(0);

// 	async function handleClick() {
// 		setPending((p) => p + 1);
// 		await delay(3000);
// 		setPending((p) => p - 1);
// 		setCompleted((c) => c + 1);
// 	}

// 	return (
// 		<>
// 			<h3>Pending: {pending}</h3>
// 			<h3>Completed: {completed}</h3>
// 			<button onClick={handleClick}>Buy</button>
// 		</>
// 	);
// }

// function delay(ms) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, ms);
// 	});
// }

// State Queue challenge
//--------------------

// function getFinalState(baseState, queue) {
// 	let finalState = baseState;

// 	for (let update of queue) {
// 		if (typeof update === "function") {
// 			// Apply the updater function.
// 			finalState = update(finalState);
// 		} else {
// 			// Replace the next state.
// 			finalState = update;
// 		}
// 	}

// 	return finalState;
// }

// function increment(n) {
// 	return n + 1;
// }
// increment.toString = () => "n => n+1";

// export default function App() {
// 	return (
// 		<>
// 			<TestCase baseState={0} queue={[1, 1, 1]} expected={1} />
// 			<hr />
// 			<TestCase baseState={0} queue={[increment, increment, increment]} expected={3} />
// 			<hr />
// 			<TestCase baseState={0} queue={[5, increment]} expected={6} />
// 			<hr />
// 			<TestCase baseState={0} queue={[5, increment, 42]} expected={42} />
// 		</>
// 	);
// }

// function TestCase({ baseState, queue, expected }) {
// 	const actual = getFinalState(baseState, queue);
// 	return (
// 		<>
// 			<p>
// 				Base state: <b>{baseState}</b>
// 			</p>
// 			<p>
// 				Queue: <b>[{queue.join(", ")}]</b>
// 			</p>
// 			<p>
// 				Expected result: <b>{expected}</b>
// 			</p>
// 			<p
// 				style={{
// 					color: actual === expected ? "green" : "red",
// 				}}
// 			>
// 				Your result: <b>{actual}</b> ({actual === expected ? "correct" : "wrong"})
// 			</p>
// 		</>
// 	);
// }

// Incorrect State challenge
//--------------------

// export default function Scoreboard() {
// 	const [player, setPlayer] = useState({
// 		firstName: "Ranjani",
// 		lastName: "Shettar",
// 		score: 10,
// 	});

// 	function handlePlusClick() {
// 		setPlayer({
// 			...player,
// 			score: player.score + 1,
// 		});
// 	}

// 	function handleFirstNameChange(e) {
// 		setPlayer({
// 			...player,
// 			firstName: e.target.value,
// 		});
// 	}

// 	function handleLastNameChange(e) {
// 		setPlayer({
// 			...player,
// 			lastName: e.target.value,
// 		});
// 	}

// 	return (
// 		<>
// 			<div>
// 				Score: <b>{player.score}</b>
// 				<div>
// 					<button onClick={handlePlusClick}>+1</button>
// 				</div>
// 			</div>
// 			<label>
// 				First name:
// 				<input value={player.firstName} onChange={handleFirstNameChange} />
// 			</label>
// 			<label>
// 				Last name:
// 				<input value={player.lastName} onChange={handleLastNameChange} />
// 			</label>
// 		</>
// 	);
// }

// Mutation Challenge
//--------------------

function Background({ position }) {
	return (
		<div
			style={{
				position: "absolute",
				transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
				width: 250,
				height: 250,
				backgroundColor: "rgba(150, 300, 0, .5)",
			}}
		/>
	);
}

function Box({ children, color, position, onMove }) {
	const [lastCoordinates, setLastCoordinates] = useState(null);

	function handlePointerDown(e) {
		e.target.setPointerCapture(e.pointerId);
		setLastCoordinates({
			x: e.clientX,
			y: e.clientY,
		});
	}

	function handlePointerMove(e) {
		if (lastCoordinates) {
			setLastCoordinates({
				x: e.clientX,
				y: e.clientY,
			});
			const dx = e.clientX - lastCoordinates.x;
			const dy = e.clientY - lastCoordinates.y;
			onMove(dx, dy);
		}
	}

	function handlePointerUp(e) {
		setLastCoordinates(null);
	}

	return (
		<div
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			style={{
				width: 100,
				height: 100,
				cursor: "grab",
				color: "black",
				backgroundColor: color,
				position: "absolute",
				border: "1px solid black",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
			}}
		>
			{children}
		</div>
	);
}

const initialPosition = {
	x: 0,
	y: 0,
};

export default function Canvas() {
	const [shape, setShape] = useState({
		color: "orange",
		position: initialPosition,
	});

	function handleMove(dx, dy) {
		setShape({
			...shape,
			position: {
				x: shape.position.x + dx,
				y: shape.position.y + dy,
			},
		});
	}

	function handleColorChange(e) {
		setShape({
			...shape,
			color: e.target.value,
		});
	}

	return (
		<>
			<select className="dropdown" value={shape.color} onChange={handleColorChange}>
				<option className="color-option" value="orange">
					orange
				</option>
				<option className="color-option" value="lightpink">
					lightpink
				</option>
				<option className="color-option" value="aliceblue">
					aliceblue
				</option>
			</select>
			<section>
				<Background position={initialPosition} />
				<Box color={shape.color} position={shape.position} onMove={handleMove}>
					Drag me!
				</Box>
			</section>
		</>
	);
}
