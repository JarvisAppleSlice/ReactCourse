import { useState, useEffect } from "react";

function ChatRoom({ roomId, serverUrl }) {
	useEffect(() => {
		const connection = createConnection({
			roomId: roomId,
			serverUrl: serverUrl,
		});
		connection.connect();
		return () => connection.disconnect();
	}, [roomId, serverUrl]);

	return <h1>Welcome to the {roomId} room!</h1>;
}

function createConnection({ serverUrl, roomId }) {
	// A real implementation would actually connect to the server
	if (typeof serverUrl !== "string") {
		throw Error("Expected serverUrl to be a string. Received: " + serverUrl);
	}
	if (typeof roomId !== "string") {
		throw Error("Expected roomId to be a string. Received: " + roomId);
	}
	return {
		connect() {
			console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + "...");
		},
		disconnect() {
			console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
		},
	};
}

export default function Fix1() {
	const [isDark, setIsDark] = useState(false);
	const [roomId, setRoomId] = useState("general");
	const [serverUrl, setServerUrl] = useState("https://localhost:3000");

	return (
		<div className={isDark ? "dark" : "light"}>
			<button onClick={() => setIsDark(!isDark)}>Toggle theme</button>
			<label>
				Server URL:{" "}
				<input value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} />
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
			<ChatRoom roomId={roomId} serverUrl={serverUrl} />
		</div>
	);
}
