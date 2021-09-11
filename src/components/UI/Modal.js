import { deleteDoc, doc, getDoc, updateDoc } from '@firebase/firestore'
import React, { Fragment, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

import styles from './Modal.module.css'

const Modal = props => {
	const [todo, setTodo] = useState()
	const [desc, setDesc] = useState()

	const [expanded, setExpanded] = useState(props.expanded)
	const [editing, setEditing] = useState(props.editing)
	const [deleting, setDeleting] = useState(props.deleting)

	const [user] = useAuthState(auth)
	const [data, setData] = useState({ todo: 'loading...' })

	const fetchData = async () => {
		const docRef = doc(db, 'users', `${user.uid}`, 'todos', `${props.id}`)
		const docSnap = await getDoc(docRef)
		setData(docSnap.data())
	}

	const editHandler = async e => {
		e.preventDefault()

		const docRef = doc(db, 'users', `${user.uid}`, 'todos', `${props.id}`)
		await updateDoc(docRef, {
			todo: todo,
			desc: desc,
		})
	}

	const deleteHandler = async a => {
		if (a) {
			const docRef = doc(db, 'users', `${user.uid}`, 'todos', `${props.id}`)
			await deleteDoc(docRef)
		} else {
			// return
		}
	}

	if (expanded) {
		fetchData()

		return createPortal(
			<Fragment>
				<div className={styles.overlay} onClick={props.close}></div>
				<div className={styles.modal}>
					<div className={styles.header}>
						<h1>{data.todo}</h1>
						<button className={styles.exitBtn} onClick={props.close}>
							✖️
						</button>
					</div>
					<div className={styles.body}>
						<p>{data.desc}</p>
					</div>
					<div className='footer'>
						<h4>Created at: {data.createdAt}</h4>
					</div>
				</div>
			</Fragment>,
			document.getElementById('overlay')
		)
	}

	if (editing) {
		return createPortal(
			<Fragment>
				<div className={styles.overlay} onClick={props.close}></div>
				<div className={styles.modal}>
					<button className={styles.exitBtn} onClick={props.close}>
						✖️
					</button>

					<form className={styles.editForm} onSubmit={editHandler}>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							id='title'
							maxLength='36'
							required
							value={todo}
							onChange={e => setTodo(e.target.value)}
						/>
						<label htmlFor='desc'>Description</label>
						<textarea
							id='desc'
							required
							onChange={e => setDesc(e.target.value)}
						></textarea>
						<button type='submit'>Edit</button>
					</form>
				</div>
			</Fragment>,
			document.getElementById('overlay')
		)
	}

	if (deleting) {
		fetchData()

		return createPortal(
			<Fragment>
				<div className={styles.overlay} onClick={props.close}></div>
				<div className={styles.modal}>
					<button className={styles.exitBtn} onClick={props.close}>
						✖️
					</button>

					<p>Are you sure you want to delete the following task?</p>
					<h2>{data.todo}</h2>
					<div className={styles.actions}>
						<button
							className={styles.accept}
							onClick={() => deleteHandler(true)}
						>
							Yes
						</button>
						<button
							className={styles.decline}
							onClick={() => deleteHandler(false)}
						>
							No
						</button>
					</div>
				</div>
			</Fragment>,
			document.getElementById('overlay')
		)
	}
}

export default Modal
