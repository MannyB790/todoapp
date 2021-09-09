import React from 'react'

const TodoCard = props => {
	return (
		<div>
			<h1>{props.todo}</h1>
			<p>{props.desc}</p>
			<p>Created at: {props.date}</p>
		</div>
	)
}

export default TodoCard
