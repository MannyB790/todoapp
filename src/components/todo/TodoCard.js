import React, { useState } from 'react'
import Modal from '../UI/Modal'

import styles from './TodoCard.module.css'

const TodoCard = props => {
	const [expanded, setExpanded] = useState(false)
	const [editing, setEditing] = useState(false)
	const [deleting, setDeleting] = useState(false)
	const [expandedId, setExpandedId] = useState()

	const deleteHandler = () => {
		setDeleting(!deleting)
		setExpandedId(props.id)
	}

	const editHandler = () => {
		setEditing(!editing)
		setExpandedId(props.id)
	}

	const expandHandler = () => {
		setExpanded(!expanded)
		setExpandedId(props.id)
	}

	return (
		<div className={styles.Card}>
			{expanded && (
				<Modal
					id={expandedId}
					close={expandHandler}
					expanded={expanded}
				></Modal>
			)}
			{editing && (
				<Modal id={expandedId} close={editHandler} editing={editing} />
			)}
			{deleting && (
				<Modal id={expandedId} close={deleteHandler} deleting={deleting} />
			)}
			<div className={styles.Info}>
				<h2>{props.todo}</h2>
				<p>{props.desc}...</p>
				<p>Created at: {props.date}</p>
			</div>
			<div className={styles.Actions}>
				<button className={styles.Delete} onClick={deleteHandler}>
					❌
				</button>
				<button className={styles.Edit} onClick={editHandler}>
					✏️
				</button>
				<button className={styles.Expand} onClick={expandHandler}>
					...
				</button>
			</div>
		</div>
	)
}

export default TodoCard
