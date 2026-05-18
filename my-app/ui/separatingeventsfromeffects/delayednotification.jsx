import { useState, useEffect } from "react";
import { useEffectEvent } from "react";
import Script from "next/script";

function createConnection(serverUrl, roomId) {
	// A real implementation would actually connect to the server
	let connectedCallback;
	let timeout;
	return {
		connect() {
			timeout = setTimeout(() => {
				if (connectedCallback) {
					connectedCallback();
				}
			}, 100);
		},
		on(event, callback) {
			if (connectedCallback) {
				throw Error("Cannot add the handler twice.");
			}
			if (event !== "connected") {
				throw Error('Only "connected" event is supported.');
			}
			connectedCallback = callback;
		},
		disconnect() {
			clearTimeout(timeout);
		},
	};
}

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

const serverUrl = "https://localhost:3000";

function ChatRoom({ roomId, theme }) {
	const onConnected = useEffectEvent((connectedRoomId) => {
		showNotification("Welcome to " + connectedRoomId, theme);
	});

	useEffect(() => {
		const connection = createConnection(serverUrl, roomId);
		let notificationTimeoutId;
		connection.on("connected", () => {
			notificationTimeoutId = setTimeout(() => {
				onConnected(roomId);
			}, 2000);
		});
		connection.connect();
		return () => {
			connection.disconnect();
			if (notificationTimeoutId !== undefined) {
				clearTimeout(notificationTimeoutId);
			}
		};
	}, [roomId]);

	return <h1>Welcome to the {roomId} room!</h1>;
}

export default function DelayedNotification() {
	const [roomId, setRoomId] = useState("general");
	const [isDark, setIsDark] = useState(false);
	return (
		<>
			<Script
				src="https://cdn.jsdelivr.net/npm/toastify-js"
				strategy="beforeInteractive"
			/>
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
			<label>
				<input
					type="checkbox"
					checked={isDark}
					onChange={(e) => setIsDark(e.target.checked)}
				/>
				Use dark theme
			</label>
			<hr />
			<ChatRoom roomId={roomId} theme={isDark ? "dark" : "light"} />
		</>
	);
}
