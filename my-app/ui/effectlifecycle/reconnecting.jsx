"use client";

import { useState, useEffect } from "react";

function createConnection(serverUrl, roomId) {
	// A real implementation would actually connect to the server
	return {
		connect() {
			console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + "...");
		},
		disconnect() {
			console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
		},
	};
}

const serverUrl = "https://localhost:3000";

function ChatRoom({ roomId }) {
	const [message, setMessage] = useState("");

	useEffect(() => {
		const connection = createConnection(serverUrl, roomId);
		connection.connect();
		return () => connection.disconnect();
	}, [roomId]);

	return (
		<>
			<h1>Welcome to the {roomId} room!</h1>
			<input value={message} onChange={(e) => setMessage(e.target.value)} />
		</>
	);
}

export default function Reconnection() {
	const [roomId, setRoomId] = useState("general");
	return (
		<>
			<label>
				Choose the chat room:{" "}
				<select
					className="dropdown"
					value={roomId}
					onChange={(e) => setRoomId(e.target.value)}
				>
					<option className="color-option" value="general">
						general
					</option>
					<option className="color-option" value="travel">
						travel
					</option>
					<option className="color-option" value="music">
						music
					</option>
				</select>
			</label>
			<hr />
			<ChatRoom roomId={roomId} />
		</>
	);
}
