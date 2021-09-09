import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from '@firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import TodoCard from '../components/todo/TodoCard'

const Todos = () => {
	const [user] = useAuthState(auth)
	const [todos, setTodos] = useState([])
	useEffect(() => {
		const unsub = onSnapshot(
			collection(db, `users/${user.uid}/todos`),
			collectionSnap => {
				collectionSnap.forEach(doc => {
					setTodos(prevState => {
						if (prevState) {
							return [...prevState, doc.data()]
						} else {
							return [doc.data()]
						}
					})
				})
			}
		)

		return () => {
			unsub()
		}
	}, [user.uid])

	return (
		<div>
			{todos.map(todo => {
				return (
					<TodoCard todo={todo.todo} desc={todo.desc} date={todo.createdAt} />
				)
			})}
		</div>
	)
}

export default Todos
