import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyA0zSUJdvATleGzzgPWrzfhEiqWnzcE77o',
	authDomain: 'to-do-app-66657.firebaseapp.com',
	projectId: 'to-do-app-66657',
	storageBucket: 'to-do-app-66657.appspot.com',
	messagingSenderId: '112624549603',
	appId: '1:112624549603:web:66054db46cd275f24a0fd6',
	measurementId: 'G-BR6M6DBQC7',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
