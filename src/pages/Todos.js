import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from '@firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import TodoCard from '../components/todo/TodoCard'

import styles from './Todos.module.css'

const Todos = () => {
	const [user] = useAuthState(auth)
	const [todos, setTodos] = useState([])
	useEffect(() => {
		const unsub = onSnapshot(
			collection(db, `users/${user.uid}/todos`),
			collectionSnap => {
				setTodos([])
				collectionSnap.forEach(doc => {
					setTodos(prevState => {
						if (prevState) {
							return [
								...prevState,
								{
									id: doc.id,
									data: doc.data(),
								},
							]
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
		<div className={styles.Todos}>
			{todos.map(todo => {
				return (
					<TodoCard
						todo={todo.data.todo.substr(0, 20)}
						desc={todo.data.desc.substr(0, 40)}
						date={todo.data.createdAt}
						key={todo.id}
						id={todo.id}
					/>
				)
			})}
		</div>
	)
}

export default Todos
