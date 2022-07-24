/** @format */

// DEPENDENCIES
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PAGES

// COMPONENTS
import NavBar from './Components/NavBar';

function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar />
			</Router>
		</div>
	);
}

export default App;
