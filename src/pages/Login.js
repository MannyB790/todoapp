import React, { useRef, useState } from 'react'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'

import styles from './AuthStyle.module.css'

const Login = () => {
	const [errorState, setErrorState] = useState()

	const history = useHistory()
	const emailRef = useRef()
	const passwordRef = useRef()

	const loginHandler = e => {
		e.preventDefault()

		signInWithEmailAndPassword(
			auth,
			emailRef.current.value,
			passwordRef.current.value
		)
			.then(() => {
				history.replace('/')
			})
			.catch(e => {
				console.error(e)
				setErrorState(e)
			})
	}

	return (
		<form className={styles.Form}>
			<label htmlFor='email'>E-Mail</label>
			<input
				className={styles.email}
				type='email'
				name='email'
				id='email'
				required
				ref={emailRef}
				placeholder='name@example.com'
			/>
			<label htmlFor='password'>Password</label>
			<input
				className={styles.password}
				type='password'
				name='password'
				id='password'
				required
				ref={passwordRef}
			/>
			<p className={styles.error}>
				{errorState && 'Invalid e-mail or password!'}
			</p>
			<button className={styles.Submit} type='submit' onClick={loginHandler}>
				Log In
			</button>
			<p>
				or{' '}
				<Link className={styles.Link} to='/signup'>
					Sign Up
				</Link>
			</p>
		</form>
	)
}

export default Login
