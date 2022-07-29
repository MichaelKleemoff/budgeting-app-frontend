/** @format */

// DEPENDENCIES
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PAGES
import Edit from './Pages/Edit';
import FourOFour from './Pages/FourOFour';
import Home from './Pages/Home';
import Index from './Pages/Index';
import New from './Pages/New';
import Show from './Pages/Show';

// COMPONENTS
import NavBar from './Components/NavBar';

function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar />
				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/transactions' element={<Index />} />
						<Route path='/transactions/new' element={<New />} />
						<Route path='/transactions/:index' element={<Show />} />
						<Route path='/transactions/:index/edit' element={<Edit />} />
						<Route path='*' element={<FourOFour />} />
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
