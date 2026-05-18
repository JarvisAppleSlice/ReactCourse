import { useState, useEffect } from "react";

function createEncryptedConnection(roomId) {
	// A real implementation would actually connect to the server
	return {
		connect() {
			console.log('✅ 🔐 Connecting to "' + roomId + "... (encrypted)");
		},
		disconnect() {
			console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
		},
	};
}

function createUnencryptedConnection(roomId) {
	// A real implementation would actually connect to the server
	return {
		connect() {
			console.log('✅ Connecting to "' + roomId + "... (unencrypted)");
		},
		disconnect() {
			console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
		},
	};
}

function ChatRoom({ roomId, isEncrypted }) {
	useEffect(() => {
		const createConnection = isEncrypted
			? createEncryptedConnection
			: createUnencryptedConnection;
		const connection = createConnection(roomId);
		connection.connect();
		return () => connection.disconnect();
	}, [roomId, isEncrypted]);

	return <h1>Welcome to the {roomId} room!</h1>;
}

export default function ConnectionSwitch() {
	const [roomId, setRoomId] = useState("general");
	const [isEncrypted, setIsEncrypted] = useState(false);
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
			<label>
				<input
					type="checkbox"
					checked={isEncrypted}
					onChange={(e) => setIsEncrypted(e.target.checked)}
				/>
				Enable encryption
			</label>
			<hr />
			<ChatRoom roomId={roomId} isEncrypted={isEncrypted} />
		</>
	);
}
