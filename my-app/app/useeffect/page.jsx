"use client";

import { useState, useRef, useEffect, useMemo } from "react";

// >>>>>>>>>>>>>>>>>>>>>
// Walkthroughs
// >>>>>>>>>>>>>>>>>>>>>

// ....isPlaying/

// function VideoPlayer({ src, isPlaying }) {
// 	const ref = useRef(null);

// 	useEffect(() => {
// 		if (isPlaying) {
// 			console.log("Calling video.play()");
// 			ref.current.play();
// 		} else {
// 			console.log("Calling video.pause()");
// 			ref.current.pause();
// 		}
// 	}, [isPlaying]);

// 	return <video ref={ref} src={src} loop playsInline />;
// }

// export default function App() {
// 	const [isPlaying, setIsPlaying] = useState(false);
// 	const [text, setText] = useState("");
// 	return (
// 		<>
// 			<input value={text} onChange={(e) => setText(e.target.value)} />
// 			<button onClick={() => setIsPlaying(!isPlaying)}>
// 				{isPlaying ? "Pause" : "Play"}
// 			</button>
// 			<VideoPlayer
// 				isPlaying={isPlaying}
// 				src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
// 			/>
// 		</>
// 	);
// }

// ....ChatRoom/

// function createConnection() {
// 	return {
// 		connect() {
// 			console.log("✅ connecting...");
// 		},
// 		disconnect() {
// 			console.log("❌ Disconnected.");
// 		},
// 	};
// }

// export default function ChatRoom() {
// 	useEffect(() => {
// 		const connection = createConnection();
// 		connection.connect();
// 		return () => connection.disconnect();
// 	}, []);
// 	return <h1>Welcome to the chat, you filthy animal!</h1>;
// }

// ....Playground/

// function Playground() {
// 	const [text, setText] = useState("abc");

// 	useEffect(() => {
// 		function onTimeout() {
// 			console.log("⏰ " + text);
// 		}

// 		console.log('🔵 Schedule "' + text + '" log');
// 		const timeoutId = setTimeout(onTimeout, 3000);

// 		return () => {
// 			console.log('🟡 Cancel "' + text + '" log');
// 			clearTimeout(timeoutId);
// 		};
// 	}, [text]);

// 	return (
// 		<>
// 			<label>
// 				What to log: <input value={text} onChange={(e) => setText(e.target.value)} />
// 			</label>
// 			<h1>{text}</h1>
// 		</>
// 	);
// }

// export default function App() {
// 	const [show, setShow] = useState(false);
// 	return (
// 		<>
// 			<button onClick={() => setShow(!show)}>
// 				{show ? "Unmount" : "Mount"} the component
// 			</button>
// 			{show && <hr />}
// 			{show && <Playground />}
// 		</>
// 	);
// }

// >>>>>>>>>>>>>>>>>>>>>
// Challenges
// >>>>>>>>>>>>>>>>>>>>>

// ...Focus on Mount

// function MyInput({ value, onChange }) {
// 	const ref = useRef(null);

// 	useEffect(() => {
// 		ref.current.focus();
// 	}, []);

// 	return <input ref={ref} value={value} onChange={onChange} />;
// }

// export default function Form() {
// 	const [show, setShow] = useState(false);
// 	const [name, setName] = useState("Taylor");
// 	const [upper, setUpper] = useState(false);
// 	return (
// 		<>
// 			<button onClick={() => setShow((s) => !s)}>{show ? "Hide" : "Show"} form</button>
// 			<br />
// 			<hr />
// 			{show && (
// 				<>
// 					<label>
// 						Enter your name:
// 						<MyInput value={name} onChange={(e) => setName(e.target.value)} />
// 					</label>
// 					<label>
// 						<input
// 							type="checkbox"
// 							checked={upper}
// 							onChange={(e) => setUpper(e.target.checked)}
// 						/>
// 						Make it uppercase
// 					</label>
// 					<p>
// 						Hello, <b>{upper ? name.toUpperCase() : name}</b>
// 					</p>
// 				</>
// 			)}
// 		</>
// 	);
// }

// ...Focus Field conditionally

// function MyInput({ shouldFocus, value, onChange }) {
// 	const ref = useRef(null);

// 	useEffect(() => {
// 		if (shouldFocus) {
// 			ref.current.focus();
// 		}
// 	}, [shouldFocus]);

// 	return <input ref={ref} value={value} onChange={onChange} />;
// }

// export default function Form() {
// 	const [show, setShow] = useState(false);
// 	const [firstName, setFirstName] = useState("Taylor");
// 	const [lastName, setLastName] = useState("Swift");
// 	const [upper, setUpper] = useState(false);
// 	const name = firstName + " " + lastName;
// 	return (
// 		<>
// 			<button onClick={() => setShow((s) => !s)}>{show ? "Hide" : "Show"} form</button>
// 			<br />
// 			<hr />
// 			{show && (
// 				<>
// 					<label>
// 						Enter your first name:
// 						<MyInput
// 							value={firstName}
// 							onChange={(e) => setFirstName(e.target.value)}
// 							shouldFocus={true}
// 						/>
// 					</label>
// 					<label>
// 						Enter your last name:
// 						<MyInput
// 							value={lastName}
// 							onChange={(e) => setLastName(e.target.value)}
// 							shouldFocus={false}
// 						/>
// 					</label>
// 					<p>
// 						Hello, <b>{upper ? name.toUpperCase() : name}</b>
// 					</p>
// 				</>
// 			)}
// 		</>
// 	);
// }

// ...Fix Interval Firing

// function Counter() {
// 	const [count, setCount] = useState(0);

// 	useEffect(() => {
// 		function onTick() {
// 			setCount((c) => c + 1);
// 		}

// 		const intervalId = setInterval(onTick, 1000);
// 		return () => clearInterval(intervalId);
// 	}, []);

// 	return <h1>{count}</h1>;
// }

// export default function Form() {
// 	const [show, setShow] = useState(false);
// 	return (
// 		<>
// 			<button onClick={() => setShow((s) => !s)}>{show ? "Hide" : "Show"} counter</button>
// 			<br />
// 			<hr />
// 			{show && <Counter />}
// 		</>
// 	);
// }

// ...Fix Fetching

// function fetchBio(person) {
// 	const delay = person === "Bob" ? 2000 : 200;
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve("This is " + person + "’s bio.");
// 		}, delay);
// 	});
// }

// export default function Page() {
// 	const [person, setPerson] = useState("Alice");
// 	const [bio, setBio] = useState(null);

// 	useEffect(() => {
// 		let ignore = false;
// 		setBio(null);
// 		fetchBio(person).then((result) => {
// 			if (!ignore) {
// 				setBio(result);
// 			}
// 		});
// 		return () => {
// 			ignore = true;
// 		};
// 	}, [person]);

// 	return (
// 		<>
// 			<select
// 				className="dropdown"
// 				value={person}
// 				onChange={(e) => {
// 					setPerson(e.target.value);
// 				}}
// 			>
// 				<option className="color-option" value="Alice">
// 					Alice
// 				</option>
// 				<option className="color-option" value="Bob">
// 					Bob
// 				</option>
// 				<option className="color-option" value="Taylor">
// 					Taylor
// 				</option>
// 			</select>
// 			<hr />
// 			<p>
// 				<i>{bio ?? "Loading..."}</i>
// 			</p>
// 		</>
// 	);
// }

// ...Transform Data without effects

// let nextId = 0;

// function createTodo(text, completed = false) {
// 	return {
// 		id: nextId++,
// 		text,
// 		completed,
// 	};
// }

// export const initialTodos = [
// 	createTodo("Get apples", true),
// 	createTodo("Get oranges", true),
// 	createTodo("Get carrots"),
// ];

// export default function TodoList() {
// 	const [todos, setTodos] = useState(initialTodos);
// 	const [showActive, setShowActive] = useState(false);
// 	const activeTodos = todos.filter((todo) => !todo.completed);
// 	const visibleTodos = showActive ? activeTodos : todos;

// 	return (
// 		<>
// 			<label>
// 				<input
// 					type="checkbox"
// 					checked={showActive}
// 					onChange={(e) => setShowActive(e.target.checked)}
// 				/>
// 				Show only active todos
// 			</label>
// 			<NewTodo onAdd={(newTodo) => setTodos([...todos, newTodo])} />
// 			<ul>
// 				{visibleTodos.map((todo) => (
// 					<li key={todo.id}>{todo.completed ? <s>{todo.text}</s> : todo.text}</li>
// 				))}
// 			</ul>
// 			<footer>{activeTodos.length} todos left</footer>
// 		</>
// 	);
// }

// function NewTodo({ onAdd }) {
// 	const [text, setText] = useState("");

// 	function handleAddClick() {
// 		setText("");
// 		onAdd(createTodo(text));
// 	}

// 	return (
// 		<>
// 			<input value={text} onChange={(e) => setText(e.target.value)} />
// 			<button onClick={handleAddClick}>Add</button>
// 		</>
// 	);
// }

// ...Cache Calculation without effects

// let nextId = 0;
// let calls = 0;

// function getVisibleTodos(todos, showActive) {
// 	console.log(`getVisibleTodos() was called ${++calls} times`);
// 	const activeTodos = todos.filter((todo) => !todo.completed);
// 	const visibleTodos = showActive ? activeTodos : todos;
// 	return visibleTodos;
// }

// function createTodo(text, completed = false) {
// 	return {
// 		id: nextId++,
// 		text,
// 		completed,
// 	};
// }

// const initialTodos = [
// 	createTodo("Get apples", true),
// 	createTodo("Get oranges", true),
// 	createTodo("Get carrots"),
// ];

// export default function TodoList() {
// 	const [todos, setTodos] = useState(initialTodos);
// 	const [showActive, setShowActive] = useState(false);
// 	const [text, setText] = useState("");
// 	const visibleTodos = useMemo(
// 		() => getVisibleTodos(todos, showActive),
// 		[todos, showActive],
// 	);

// 	function handleAddClick() {
// 		setText("");
// 		setTodos([...todos, createTodo(text)]);
// 	}

// 	return (
// 		<>
// 			<label>
// 				<input
// 					type="checkbox"
// 					checked={showActive}
// 					onChange={(e) => setShowActive(e.target.checked)}
// 				/>
// 				Show only active todos
// 			</label>
// 			<input value={text} onChange={(e) => setText(e.target.value)} />
// 			<button onClick={handleAddClick}>Add</button>
// 			<ul>
// 				{visibleTodos.map((todo) => (
// 					<li key={todo.id}>{todo.completed ? <s>{todo.text}</s> : todo.text}</li>
// 				))}
// 			</ul>
// 		</>
// 	);
// }

// ...Reset State without effects

// function ContactList({ contacts, selectedId, onSelect }) {
// 	return (
// 		<section>
// 			<ul className="state">
// 				{contacts.map((contact) => (
// 					<li key={contact.id}>
// 						<button
// 							onClick={() => {
// 								onSelect(contact.id);
// 							}}
// 						>
// 							{contact.id === selectedId ? <b>{contact.name}</b> : contact.name}
// 						</button>
// 					</li>
// 				))}
// 			</ul>
// 		</section>
// 	);
// }

// function EditForm({ savedContact, onSave }) {
// 	const [name, setName] = useState(savedContact.name);
// 	const [email, setEmail] = useState(savedContact.email);

// 	return (
// 		<>
// 			<section className="state-section">
// 				<label>
// 					Name:{" "}
// 					<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
// 				</label>
// 				<label>
// 					Email:{" "}
// 					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
// 				</label>
// 			</section>
// 			<section className="state-section">
// 				<button
// 					onClick={() => {
// 						const updatedData = {
// 							id: savedContact.id,
// 							name: name,
// 							email: email,
// 						};
// 						onSave(updatedData);
// 					}}
// 				>
// 					Save
// 				</button>
// 				<button
// 					onClick={() => {
// 						setName(savedContact.name);
// 						setEmail(savedContact.email);
// 					}}
// 				>
// 					Reset
// 				</button>
// 			</section>
// 		</>
// 	);
// }

// function EditContact(props) {
// 	return <EditForm {...props} key={props.savedContact.id} />;
// }

// export default function ContactManager() {
// 	const [contacts, setContacts] = useState(initialContacts);
// 	const [selectedId, setSelectedId] = useState(0);
// 	const selectedContact = contacts.find((c) => c.id === selectedId);

// 	function handleSave(updatedData) {
// 		const nextContacts = contacts.map((c) => {
// 			if (c.id === updatedData.id) {
// 				return updatedData;
// 			} else {
// 				return c;
// 			}
// 		});
// 		setContacts(nextContacts);
// 	}

// 	return (
// 		<div>
// 			<ContactList
// 				contacts={contacts}
// 				selectedId={selectedId}
// 				onSelect={(id) => setSelectedId(id)}
// 			/>
// 			<hr />
// 			<EditContact savedContact={selectedContact} onSave={handleSave} />
// 		</div>
// 	);
// }

// const initialContacts = [
// 	{ id: 0, name: "Taylor", email: "taylor@mail.com" },
// 	{ id: 1, name: "Alice", email: "alice@mail.com" },
// 	{ id: 2, name: "Bob", email: "bob@mail.com" },
// ];

// ...Submit form  without effects

export default function Form() {
	const [showForm, setShowForm] = useState(true);
	const [message, setMessage] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		setShowForm(false);
		sendMessage(message);
	}

	if (!showForm) {
		return (
			<>
				<h1>Thanks for using our services!</h1>
				<button
					onClick={() => {
						setMessage("");
						setShowForm(true);
					}}
				>
					Open chat
				</button>
			</>
		);
	}

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				className="submit-form"
				placeholder="Message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button type="submit" disabled={message === ""}>
				Send
			</button>
		</form>
	);
}

function sendMessage(message) {
	console.log("Sending message: " + message);
}
