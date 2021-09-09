import { createUserWithEmailAndPassword } from '@firebase/auth'
import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'

import styles from './AuthStyle.module.css'

const Signup = () => {
	const [errorState, setErrorState] = useState()

	const history = useHistory()
	const emailRef = useRef()
	const passwordRef = useRef()

	const signUpHandler = e => {
		e.preventDefault()

		createUserWithEmailAndPassword(
			auth,
			emailRef.current.value,
			passwordRef.current.value
		)
			.then(() => {
				history.replace('/login')
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
			<button className={styles.Submit} type='submit' onClick={signUpHandler}>
				Sign Up
			</button>
			<p>
				or{' '}
				<Link className={styles.Link} to='/login'>
					Log In
				</Link>
			</p>
		</form>
	)
}

export default Signup
