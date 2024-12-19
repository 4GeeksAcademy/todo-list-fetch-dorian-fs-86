import React, { useEffect, useState } from "react";


const Home = () => {
	const [state, setState] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		getDataUser()
	}, []);


	const getDataUser = async () => {
		const response = await fetch(
			"https://playground.4geeks.com/todo/users/dorian",
			{ method: 'GET' }
		);
		if(!response.ok ){
			createUser();
		}
		const data = await response.json();
		setState(data.todos)
		console.log(data)
	};

	const createUser = async () => {
		const response = await fetch("https://playground.4geeks.com/todo/users/dorian", { method: "POST"} );
		return await response.json();
	}


	const add = async () => {
		if(input.trim() === "") return; 
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/dorian",
			{
				method: "POST",
				body: JSON.stringify({
					"label": input,
					"is_done": false
				  }),
				headers: {"content-type" : "application/json"}
			}
		);
		const newTask = await response.json();
		console.log("this is your new task", newTask);
		setState([...state, newTask]);
		setInput('');

		} catch (error) {
			console.error("error", error);
		}
	};

	const deleteTask = async (id) => {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {method: "DELETE"});
		const filtered = state.filter((item) => {
			return item.id !== id;
		});
		setState(filtered);
	};

	return (
		<div className="todo-list">
			<h1>TODO LIST</h1>
			<div className="input-add">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="text"
					placeholder="Add List"
				></input>
				<button onClick={add}>+</button>
			</div>
			<ul>
			{state.length <= 0
					? 'No Tasks'
					: state.map((item) => {
						return (
							<div>
								<li>
									{item.label}
									<button className="delete"
										onClick={() => {
											deleteTask(item.id);
										}}
									>
										x
									</button>
								</li>
							</div>
						);
					})}
			</ul>
		</div>
	);
};

export default Home;
