import { Redirect, Route, Switch } from 'react-router-dom'
import Navigation from './components/layout/Navigation'
import Todo from './components/todo/Todo'
import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Todos from './pages/Todos'

function App() {
	const [user] = useAuthState(auth)

	return (
		<div className='App'>
			<Navigation />
			<Switch>
				<Route path='/' exact>
					{!user && <Redirect to='/login'></Redirect>}
					{user && <Todo />}
				</Route>
				{!user && (
					<Route path='/login'>
						<Login />
					</Route>
				)}
				{!user && (
					<Route path='/signup'>
						<Signup />
					</Route>
				)}
				{user && (
					<Route path='/todos'>
						<Todos />
					</Route>
				)}
			</Switch>
		</div>
	)
}

export default App
