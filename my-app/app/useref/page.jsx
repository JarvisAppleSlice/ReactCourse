"use client";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";

// ----------------------
// Walkthrough...
// ----------------------

// Counter 1
// function Count() {
// 	const ref = useRef(0);
// 	function handleClick() {
// 		ref.current = ref.current + 1;
// 		alert("you clicked " + ref.current + " times!");
// 	}
// 	return <button onClick={handleClick}>Click Me!</button>;
// }

// Stopwatch w/ lap button
// function Stopwatch() {
// 	const [startTime, setStartTime] = useState(null);
// 	const [now, setNow] = useState(null);
// 	const [laps, setlaps] = useState([]);
// 	const intervalRef = useRef(null);

// 	function handleStart() {
// 		setStartTime(Date.now());
// 		setNow(Date.now());

// 		clearInterval(intervalRef.current);
// 		intervalRef.current = setInterval(() => {
// 			setNow(Date.now());
// 		}, 10);
// 	}

// 	function handleStop() {
// 		clearInterval(intervalRef.current);
// 	}

// 	function handleLap() {
// 		if (startTime != null && now != null) {
// 			const lapTime = (now - startTime) / 1000;

// 			setlaps([...laps, lapTime]);
// 		}
// 	}

// 	let secondsPassed = 0;
// 	if (startTime != null && now != null) {
// 		secondsPassed = (now - startTime) / 1000;
// 	}

// 	return (
// 		<>
// 			<h1>Time passed: {secondsPassed.toFixed(3)}</h1>
// 			<button onClick={handleStart}>Start</button>
// 			<button onClick={handleStop}>Stop</button>
// 			<button onClick={handleLap}>Lap</button>
// 			<h2>Laps</h2>
// 			<ul>
// 				{laps.map((laps, index) => (
// 					<li key={index}>
// 						Lap {index + 1}: {laps.toFixed(3)}
// 					</li>
// 				))}
// 			</ul>
// 		</>
// 	);
// }

// Counter 2

// function Counter() {
// 	const [count, setCount] = useState(0);

// 	function handleClick() {
// 		setCount(count + 1);
// 	}

// 	return <button onClick={handleClick}>You clicked {count} times</button>;
// }

// Focusing a text input

// function MyInput({ ref }) {
// 	return <input ref={ref} />;
// }

// export default function MyForm() {
// 	const inputRef = useRef(null);

// 	function handleClick() {
// 		inputRef.current.focus();
// 	}

// 	function handleClick() {
// 		inputRef.current.focus();
// 	}
// 	return (
// 		<>
// 			<MyInput ref={inputRef} />
// 			<button onClick={handleClick}>Focus the input</button>
// 		</>
// 	);
// }

// scrolling to an element

// export default function CatFriends() {
// 	const firstCatRef = useRef(null);
// 	const secondCatRef = useRef(null);
// 	const thirdCatRef = useRef(null);

// 	function handleScrollToFirstCat() {
// 		firstCatRef.current.scrollIntoView({
// 			behavior: "smooth",
// 			block: "nearest",
// 			inline: "center",
// 		});
// 	}

// 	function handleScrollToSecondCat() {
// 		secondCatRef.current.scrollIntoView({
// 			behavior: "smooth",
// 			block: "nearest",
// 			inline: "center",
// 		});
// 	}

// 	function handleScrollToThirdCat() {
// 		thirdCatRef.current.scrollIntoView({
// 			behavior: "smooth",
// 			block: "nearest",
// 			inline: "center",
// 		});
// 	}

// 	return (
// 		<>
// 			<nav className="scroll-nav">
// 				<button onClick={handleScrollToFirstCat}>Neo</button>
// 				<button onClick={handleScrollToSecondCat}>Millie</button>
// 				<button onClick={handleScrollToThirdCat}>Bella</button>
// 			</nav>
// 			<div className="scroll-div">
// 				<ul className="scroll-ul">
// 					<li className="scroll-li">
// 						<img src="https://placecats.com/neo/300/200" alt="Neo" ref={firstCatRef} />
// 					</li>
// 					<li className="scroll-li">
// 						<img
// 							src="https://placecats.com/millie/200/200"
// 							alt="Millie"
// 							ref={secondCatRef}
// 						/>
// 					</li>
// 					<li className="scroll-li">
// 						<img
// 							src="https://placecats.com/bella/199/200"
// 							alt="Bella"
// 							ref={thirdCatRef}
// 						/>
// 					</li>
// 				</ul>
// 			</div>
// 		</>
// 	);
// }

// ----------------------
// Assignment Challenges...
// ----------------------

// Fix Broken Chat input

// export default function Chat() {
// 	const [text, setText] = useState("");
// 	const [isSending, setIsSending] = useState(false);
// 	const timeoutRef = useRef(null);

// 	function handleSend() {
// 		setIsSending(true);
// 		timeoutRef.current = setTimeout(() => {
// 			alert("Sent!");
// 			setIsSending(false);
// 		}, 3000);
// 	}

// 	function handleUndo() {
// 		setIsSending(false);
// 		clearTimeout(timeoutRef.current);
// 	}

// 	return (
// 		<>
// 			<input
// 				disabled={isSending}
// 				value={text}
// 				onChange={(e) => setText(e.target.value)}
// 			/>
// 			<button disabled={isSending} onClick={handleSend}>
// 				{isSending ? "Sending..." : "Send"}
// 			</button>
// 			{isSending && <button onClick={handleUndo}>Undo</button>}
// 		</>
// 	);
// }

// On/Off Button

// export default function Toggle() {
// 	const [isOn, setIsOn] = useState(false);

// 	return (
// 		<button
// 			onClick={() => {
// 				setIsOn(!isOn);
// 			}}
// 		>
// 			{isOn ? "On" : "Off"}
// 		</button>
// 	);
// }

// Fix Debouncing

// function DebouncedButton({ onClick, children }) {
// 	const timeoutRef = useRef(null);

// 	return (
// 		<button
// 			onClick={() => {
// 				clearTimeout(timeoutRef.current);
// 				timeoutRef.current = setTimeout(() => {
// 					onClick();
// 				}, 1000);
// 			}}
// 		>
// 			{children}
// 		</button>
// 	);
// }

// export default function Dashboard() {
// 	return (
// 		<>
// 			<DebouncedButton onClick={() => alert("Spaceship launched!")}>
// 				Launch the spaceship
// 			</DebouncedButton>
// 			<DebouncedButton onClick={() => alert("Soup boiled!")}>
// 				Boil the soup
// 			</DebouncedButton>
// 			<DebouncedButton onClick={() => alert("Lullaby sung!")}>
// 				Sing a lullaby
// 			</DebouncedButton>
// 		</>
// 	);
// }

// Latest State

// export default function Chat() {
// 	const [text, setText] = useState("");
// 	const textRef = useRef(text);

// 	function handleChange(e) {
// 		setText(e.target.value);
// 		textRef.current = e.target.value;
// 	}

// 	function handleSend() {
// 		setTimeout(() => {
// 			alert("Sending: " + textRef.current);
// 		}, 3000);
// 	}

// 	return (
// 		<>
// 			<input value={text} onChange={handleChange} />
// 			<button onClick={handleSend}>Send</button>
// 		</>
// 	);
// }

// Play and Pause Video

// export default function VideoPlayer() {
// 	const [isPlaying, setIsPlaying] = useState(false);
// 	const ref = useRef(null);

// 	function handleClick() {
// 		const nextIsPlaying = !isPlaying;
// 		setIsPlaying(nextIsPlaying);

// 		if (nextIsPlaying) {
// 			ref.current.play();
// 		} else {
// 			ref.current.pause();
// 		}
// 	}

// 	return (
// 		<>
// 			<button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
// 			<video
// 				width="250"
// 				ref={ref}
// 				onPlay={() => setIsPlaying(true)}
// 				onPause={() => setIsPlaying(false)}
// 			>
// 				<source
// 					src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
// 					type="video/mp4"
// 				/>
// 			</video>
// 		</>
// 	);
// }

// Focus Search Field

// export default function Page() {
// 	const inputRef = useRef(null);
// 	return (
// 		<>
// 			<nav>
// 				<button
// 					onClick={() => {
// 						inputRef.current.focus();
// 					}}
// 				>
// 					Search
// 				</button>
// 			</nav>
// 			<input ref={inputRef} placeholder="Looking for something?" />
// 		</>
// 	);
// }

// Scroll

// export default function CatFriends() {
// 	const selectedRef = useRef(null);
// 	const [index, setIndex] = useState(0);

// 	return (
// 		<>
// 			<nav className="scroll-nav">
// 				<button
// 					className="scroll-button"
// 					onClick={() => {
// 						flushSync(() => {
// 							if (index < catList.length - 1) {
// 								setIndex(index + 1);
// 							} else {
// 								setIndex(0);
// 							}
// 						});
// 						selectedRef.current.scrollIntoView({
// 							behavior: "smooth",
// 							block: "nearest",
// 							inline: "center",
// 						});
// 					}}
// 				>
// 					Next
// 				</button>
// 			</nav>
// 			<div className="scroll-div">
// 				<ul className="scroll-ul">
// 					{catList.map((cat, i) => (
// 						<li className="scroll-li" key={cat.id} ref={index === i ? selectedRef : null}>
// 							<img
// 								className={index === i ? "active" : ""}
// 								src={cat.imageUrl}
// 								alt={"Cat #" + cat.id}
// 							/>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		</>
// 	);
// }

// const catCount = 10;
// const catList = new Array(catCount);
// for (let i = 0; i < catCount; i++) {
// 	const bucket = Math.floor(Math.random() * catCount) % 2;
// 	let imageUrl = "";
// 	switch (bucket) {
// 		case 0: {
// 			imageUrl = "https://placecats.com/neo/250/200";
// 			break;
// 		}
// 		case 1: {
// 			imageUrl = "https://placecats.com/millie/250/200";
// 			break;
// 		}
// 		case 2:
// 		default: {
// 			imageUrl = "https://placecats.com/bella/250/200";
// 			break;
// 		}
// 	}
// 	catList[i] = {
// 		id: i,
// 		imageUrl,
// 	};
// }

// Focus Search With Separate Components

function SearchInput({ ref }) {
	return <input ref={ref} placeholder="Looking for something?" />;
}

function SearchButton({ onClick }) {
	return <button onClick={onClick}>Search</button>;
}

export default function Page() {
	const inputRef = useRef(null);
	return (
		<>
			<nav>
				<SearchButton
					onClick={() => {
						inputRef.current.focus();
					}}
				/>
			</nav>
			<SearchInput ref={inputRef} />
		</>
	);
}
