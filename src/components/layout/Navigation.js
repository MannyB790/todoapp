import { signOut } from '@firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'

import classes from './Navigation.module.css'

const Navigation = () => {
	const [user] = useAuthState(auth)
	const history = useHistory()

	const logOutHandler = () => {
		signOut(auth)
			.then(() => {
				history.replace('/')
			})
			.catch(err => {
				console.error(err)
			})
	}

	const signInHandler = () => {
		history.push('/login')
	}

	return (
		<nav className={classes.navBar}>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{user && (
					<li>
						<Link to='/todos'>Todos</Link>
					</li>
				)}

				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
			{!user ? (
				<button className={classes.button} onClick={signInHandler}>
					Log in
				</button>
			) : (
				<button className={classes.button} onClick={logOutHandler}>
					Log Out
				</button>
			)}
		</nav>
	)
}

export default Navigation
