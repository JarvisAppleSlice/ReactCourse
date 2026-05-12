"use client";

import { useState, useEffect } from "react";

const letters = ["A", "B", "C", "D"];

function Square({ guessed, hasShip, isPlayerBoard, onSquareClick }) {
	let display = "";

	if (isPlayerBoard && hasShip) {
		display = "🚤";
	}

	if (guessed) {
		display = hasShip ? "🔥" : "💦";
	}

	return (
		<button
			className={`bs-square ${
				guessed && hasShip ? "hit" : guessed && !hasShip ? "miss" : ""
			}`}
			onClick={onSquareClick}
		>
			{display}
		</button>
	);
}

function Board({ board, guessedBoard, isPlayerBoard, onSquareClick }) {
	const size = 4;

	return (
		<div className="bs-board">
			{/* TOP LABELS */}
			<div className="bs-label-row">
				<div className="bs-label-empty" />
				{letters.map((l) => (
					<div key={l} className="bs-label">
						{l}
					</div>
				))}
				<div className="bs-label-empty" />
			</div>

			{/* GRID */}
			{Array.from({ length: size }).map((_, row) => (
				<div className="bs-board-row" key={row}>
					{/* LEFT LABEL */}
					<div className="bs-label">{row + 1}</div>

					{/* SQUARES */}
					{Array.from({ length: size }).map((_, col) => {
						const index = row * size + col;

						return (
							<Square
								key={index}
								hasShip={board[index]}
								guessed={guessedBoard[index]}
								isPlayerBoard={isPlayerBoard}
								onSquareClick={() => onSquareClick(index)}
							/>
						);
					})}

					{/* RIGHT LABEL */}
					<div className="bs-label">{row + 1}</div>
				</div>
			))}

			{/* BOTTOM LABELS */}
			<div className="bs-label-row">
				<div className="bs-label-empty" />
				{letters.map((l) => (
					<div key={l} className="bs-label">
						{l}
					</div>
				))}
				<div className="bs-label-empty" />
			</div>
		</div>
	);
}

// DIRECTIONS:
// horizontal, vertical, diagonal
const directions = [
	1, // right
	4, // down
	5, // diagonal down-right
	3, // diagonal down-left
];

function generateShipBoard() {
	const board = Array(16).fill(false);

	let placed = false;

	while (!placed) {
		const start = Math.floor(Math.random() * 16);
		const direction = directions[Math.floor(Math.random() * directions.length)];

		const shipTiles = [start];

		let valid = true;

		for (let i = 1; i < 3; i++) {
			const nextTile = start + direction * i;

			// off board
			if (nextTile < 0 || nextTile >= 16) {
				valid = false;
				break;
			}

			const previousCol = shipTiles[i - 1] % 4;
			const nextCol = nextTile % 4;

			// prevent wrapping across rows
			if (
				(direction === 1 && nextCol !== previousCol + 1) ||
				(direction === 5 && nextCol !== previousCol + 1) ||
				(direction === 3 && nextCol !== previousCol - 1)
			) {
				valid = false;
				break;
			}

			shipTiles.push(nextTile);
		}

		if (valid) {
			shipTiles.forEach((tile) => {
				board[tile] = true;
			});

			placed = true;
		}
	}

	return board;
}

export default function Game() {
	const [playerBoard, setPlayerBoard] = useState(Array(16).fill(false));

	const [computerBoard, setComputerBoard] = useState(Array(16).fill(false));

	useEffect(() => {
		setPlayerBoard(generateShipBoard());
		setComputerBoard(generateShipBoard());
	}, []);

	const [playerGuesses, setPlayerGuesses] = useState(Array(16).fill(false));

	const [computerGuesses, setComputerGuesses] = useState(Array(16).fill(false));

	const [playerTurn, setPlayerTurn] = useState(true);
	const [winner, setWinner] = useState("");

	function countHits(board, guesses) {
		let hits = 0;

		for (let i = 0; i < board.length; i++) {
			if (board[i] && guesses[i]) {
				hits++;
			}
		}

		return hits;
	}

	function handlePlayerClick(i) {
		if (playerGuesses[i] || winner || !playerTurn) {
			return;
		}

		const nextGuesses = playerGuesses.slice();
		nextGuesses[i] = true;

		setPlayerGuesses(nextGuesses);

		const playerHits = countHits(computerBoard, nextGuesses);

		// ship is 3 tiles long
		if (playerHits >= 3) {
			setWinner("Player Wins!");
			return;
		}

		setPlayerTurn(false);

		setTimeout(() => {
			computerMove();
		}, 700);
	}

	function computerMove() {
		let randomIndex;

		do {
			randomIndex = Math.floor(Math.random() * 16);
		} while (computerGuesses[randomIndex]);

		const nextGuesses = computerGuesses.slice();
		nextGuesses[randomIndex] = true;

		setComputerGuesses(nextGuesses);

		const computerHits = countHits(playerBoard, nextGuesses);

		if (computerHits >= 3) {
			setWinner("Computer Wins!");
			return;
		}

		setPlayerTurn(true);
	}

	function resetGame() {
		setPlayerBoard(generateShipBoard());
		setComputerBoard(generateShipBoard());

		setPlayerGuesses(Array(16).fill(false));
		setComputerGuesses(Array(16).fill(false));

		setPlayerTurn(true);
		setWinner("");
	}

	return (
		<>
			<section className="bs-main">
				<div>
					<h1 className="bs-title">Mini Battleship</h1>

					<h2 className="bs-turn">
						{winner ? winner : playerTurn ? "Player Turn" : "Computer Turn"}
					</h2>

					<div style={{ display: "flex", gap: "50px" }}>
						<div>
							<h2 className="bs-board-title">Player Board</h2>

							<Board
								board={playerBoard}
								guessedBoard={computerGuesses}
								isPlayerBoard={true}
								onSquareClick={() => {}}
							/>
						</div>

						<div>
							<h2 className="bs-board-title">Computer Board</h2>

							<Board
								board={computerBoard}
								guessedBoard={playerGuesses}
								isPlayerBoard={false}
								onSquareClick={handlePlayerClick}
							/>
						</div>
					</div>
				</div>
			</section>
			<div className="bs-reset">
				<button onClick={resetGame}>Reset Game</button>
			</div>
		</>
	);
}
