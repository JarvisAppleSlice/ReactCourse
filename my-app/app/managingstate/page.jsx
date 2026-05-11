"use client";

import { useState } from "react";

import { createContext, useContext, useReducer } from "react";

function AddTask() {
	const [text, setText] = useState("");
	const dispatch = useTasksDispatch();
	return (
		<>
			<div>
				<input
					className="addtask"
					placeholder="Add task"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button
					onClick={() => {
						setText("");
						dispatch({
							type: "added",
							id: nextId++,
							text: text,
						});
					}}
				>
					Add
				</button>
			</div>
		</>
	);
}

let nextId = 3;

function TaskList() {
	const tasks = useTasks();
	return (
		<ul>
			{tasks.map((task) => (
				<li key={task.id}>
					<Task task={task} />
				</li>
			))}
		</ul>
	);
}

function Task({ task }) {
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useTasksDispatch();
	let taskContent;
	if (isEditing) {
		taskContent = (
			<>
				<input
					value={task.text}
					onChange={(e) => {
						dispatch({
							type: "changed",
							task: {
								...task,
								text: e.target.value,
							},
						});
					}}
				/>
				<button onClick={() => setIsEditing(false)}>Save</button>
			</>
		);
	} else {
		taskContent = (
			<>
				{task.text}
				<button onClick={() => setIsEditing(true)}>Edit</button>
			</>
		);
	}
	return (
		<label>
			<input
				className="checkbox"
				type="checkbox"
				checked={task.done}
				onChange={(e) => {
					dispatch({
						type: "changed",
						task: {
							...task,
							done: e.target.checked,
						},
					});
				}}
			/>
			{taskContent}
			<button
				onClick={() => {
					dispatch({
						type: "deleted",
						id: task.id,
					});
				}}
			>
				Delete
			</button>
		</label>
	);
}

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

function TasksProvider({ children }) {
	const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

	return (
		<TasksContext value={tasks}>
			<TasksDispatchContext value={dispatch}>{children}</TasksDispatchContext>
		</TasksContext>
	);
}

function useTasks() {
	return useContext(TasksContext);
}

function useTasksDispatch() {
	return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
	switch (action.type) {
		case "added": {
			return [
				...tasks,
				{
					id: action.id,
					text: action.text,
					done: false,
				},
			];
		}
		case "changed": {
			return tasks.map((t) => {
				if (t.id === action.task.id) {
					return action.task;
				} else {
					return t;
				}
			});
		}
		case "deleted": {
			return tasks.filter((t) => t.id !== action.id);
		}
		default: {
			throw Error("Unknown action: " + action.type);
		}
	}
}

const initialTasks = [
	{ id: 0, text: "Eat Breakfast", done: true },
	{ id: 1, text: "Eat Lunch", done: false },
	{ id: 2, text: "Eat Dinner", done: false },
];

export default function TaskApp() {
	return (
		<TasksProvider>
			<h1>A day in the Life...</h1>
			<AddTask />
			<TaskList />
		</TasksProvider>
	);
}
