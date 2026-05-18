import { useState, useEffect } from "react";
import { useEffectEvent } from "react";

import Script from "next/script";

function showNotification(message, theme) {
	Toastify({
		text: message,
		duration: 2000,
		gravity: "top",
		position: "right",
		style: {
			background: theme === "dark" ? "black" : "white",
			color: theme === "dark" ? "white" : "black",
		},
	}).showToast();
}

function ChatRoom({ roomId, isEncrypted, onMessage }) {
	const onReceiveMessage = useEffectEvent(onMessage);

	useEffect(() => {
		function createConnection() {
			const options = {
				serverUrl: "https://localhost:1234",
				roomId: roomId,
			};
			if (isEncrypted) {
				return createEncryptedConnection(options);
			} else {
				return createUnencryptedConnection(options);
			}
		}

		const connection = createConnection();
		connection.on("message", (msg) => onReceiveMessage(msg));
		connection.connect();
		return () => connection.disconnect();
	}, [roomId, isEncrypted]);

	return <h1>Welcome to the {roomId} room!</h1>;
}

function createEncryptedConnection({ serverUrl, roomId }) {
	// A real implementation would actually connect to the server
	if (typeof serverUrl !== "string") {
		throw Error("Expected serverUrl to be a string. Received: " + serverUrl);
	}
	if (typeof roomId !== "string") {
		throw Error("Expected roomId to be a string. Received: " + roomId);
	}
	let intervalId;
	let messageCallback;
	return {
		connect() {
			console.log('✅ 🔐 Connecting to "' + roomId + '" room... (encrypted)');
			clearInterval(intervalId);
			intervalId = setInterval(() => {
				if (messageCallback) {
					if (Math.random() > 0.5) {
						messageCallback("hey");
					} else {
						messageCallback("lol");
					}
				}
			}, 3000);
		},
		disconnect() {
			clearInterval(intervalId);
			messageCallback = null;
			console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
		},
		on(event, callback) {
			if (messageCallback) {
				throw Error("Cannot add the handler twice.");
			}
			if (event !== "message") {
				throw Error('Only "message" event is supported.');
			}
			messageCallback = callback;
		},
	};
}

function createUnencryptedConnection({ serverUrl, roomId }) {
	// A real implementation would actually connect to the server
	if (typeof serverUrl !== "string") {
		throw Error("Expected serverUrl to be a string. Received: " + serverUrl);
	}
	if (typeof roomId !== "string") {
		throw Error("Expected roomId to be a string. Received: " + roomId);
	}
	let intervalId;
	let messageCallback;
	return {
		connect() {
			console.log('✅ Connecting to "' + roomId + '" room (unencrypted)...');
			clearInterval(intervalId);
			intervalId = setInterval(() => {
				if (messageCallback) {
					if (Math.random() > 0.5) {
						messageCallback("hey");
					} else {
						messageCallback("lol");
					}
				}
			}, 3000);
		},
		disconnect() {
			clearInterval(intervalId);
			messageCallback = null;
			console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
		},
		on(event, callback) {
			if (messageCallback) {
				throw Error("Cannot add the handler twice.");
			}
			if (event !== "message") {
				throw Error('Only "message" event is supported.');
			}
			messageCallback = callback;
		},
	};
}

export default function Reconnecting2() {
	const [isDark, setIsDark] = useState(false);
	const [roomId, setRoomId] = useState("general");
	const [isEncrypted, setIsEncrypted] = useState(false);

	return (
		<>
			<Script
				src="https://cdn.jsdelivr.net/npm/toastify-js"
				strategy="beforeInteractive"
			/>
			<label>
				<input
					type="checkbox"
					checked={isDark}
					onChange={(e) => setIsDark(e.target.checked)}
				/>
				Use dark theme
			</label>
			<label>
				<input
					type="checkbox"
					checked={isEncrypted}
					onChange={(e) => setIsEncrypted(e.target.checked)}
				/>
				Enable encryption
			</label>
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
			<ChatRoom
				roomId={roomId}
				isEncrypted={isEncrypted}
				onMessage={(msg) => {
					showNotification("New message: " + msg, isDark ? "dark" : "light");
				}}
			/>
		</>
	);
}
