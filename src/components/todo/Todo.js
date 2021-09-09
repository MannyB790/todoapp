import React, { useState } from 'react'

import classes from './Todo.module.css'
import { useRef } from 'react'
import { addDoc, collection } from '@firebase/firestore'
import { auth, db } from '../../firebase'

const Todo = () => {
	const [todoText, setTodoText] = useState('')
	const [descText, setDescText] = useState('')

	const todoRef = useRef()
	const descRef = useRef()

	const submitHandler = async e => {
		e.preventDefault()

		const collectionRef = collection(db, `users/${auth.currentUser.uid}/todos`)
		addDoc(collectionRef, {
			todo: todoRef.current.value,
			desc: descRef.current.value,
			createdAt: new Date().toLocaleString(),
			completed: false,
		}).then(() => {
			setTodoText('')
			setDescText('')
		})
	}

	return (
		<div className={classes.Todo}>
			<form onSubmit={submitHandler}>
				<label htmlFor='todo'>To Do</label>
				<input
					type='text'
					id='todo'
					required
					ref={todoRef}
					value={todoText}
					onChange={e => {
						setTodoText(e.target.value)
					}}
				/>
				<label htmlFor='Description'>Description</label>
				<textarea
					id='Description'
					required
					ref={descRef}
					value={descText}
					onChange={e => {
						setDescText(e.target.value)
					}}
				></textarea>
				<button type='submit'>Add</button>
			</form>
		</div>
	)
}

export default Todo
