"use client";
import { useEffect, useRef, useState } from "react";

const predefinedPrompts = [
	"The quick brown fox jumps over the lazy dog",
	"React makes building user interfaces easier",
	"Typing speed improves with consistent practice",
];

// Simple random sentence generator
function generateRandomSentence(wordCount = 10) {
	const words = [
		"apple",
		"river",
		"planet",
		"shadow",
		"forest",
		"window",
		"coffee",
		"galaxy",
		"silver",
		"thunder",
		"future",
		"dragon",
		"rocket",
		"mirror",
		"castle",
	];

	let sentence = [];

	for (let i = 0; i < wordCount; i++) {
		const randomIndex = Math.floor(Math.random() * words.length);
		sentence.push(words[randomIndex]);
	}

	return sentence.join(" ");
}

// Custom Hook
function useTypingSpeed(prompt, typedText) {
	const [startTime, setStartTime] = useState(null);
	const [wpm, setWpm] = useState(null);
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		// Start timer when user begins typing
		if (typedText.length > 0 && startTime === null) {
			setStartTime(Date.now());
		}

		// Exact match check
		if (typedText === prompt && !completed) {
			const endTime = Date.now();

			const minutes = (endTime - startTime) / 1000 / 60;

			const wordCount = prompt.trim().split(/\s+/).length;

			const calculatedWpm = Math.round(wordCount / minutes);

			setWpm(calculatedWpm);
			setCompleted(true);
		}
	}, [typedText, prompt, startTime, completed]);

	return { wpm, completed };
}

export default function App() {
	const [prompt, setPrompt] = useState(predefinedPrompts[0]);

	const [typedText, setTypedText] = useState("");

	const textareaRef = useRef(null);

	// Focus textarea on mount
	useEffect(() => {
		textareaRef.current.focus();
	}, []);

	const { wpm, completed } = useTypingSpeed(prompt, typedText);

	function handleNewPrompt() {
		const useRandom = Math.random() > 0.5;

		if (useRandom) {
			setPrompt(generateRandomSentence());
		} else {
			const randomPrompt =
				predefinedPrompts[Math.floor(Math.random() * predefinedPrompts.length)];

			setPrompt(randomPrompt);
		}

		setTypedText("");

		// Refocus textarea
		textareaRef.current.focus();
	}
	return (
		<div className="typing-container">
			<h1 className="typing-title">Typing Speed Test</h1>

			<p className="typing-instructions">Type the following prompt exactly as shown:</p>

			<div className="prompt-box">{prompt}</div>

			<textarea
				ref={textareaRef}
				value={typedText}
				onChange={(e) => setTypedText(e.target.value)}
				placeholder="Start typing here..."
				className="typing-textarea"
			/>

			<div className="stats">
				<p>Characters Typed: {typedText.length}</p>

				{completed && <div className="wpm-result">Your WPM: {wpm}</div>}

				<button onClick={handleNewPrompt}>New Prompt</button>
			</div>
		</div>
	);
}
