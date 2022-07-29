/** @format */

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import budgetingLogo from '../images/budgeting-favicon2.jpeg';
import Button from 'react-bootstrap/Button';

function NavBar() {
	return (
		<>
			<Navbar className='nav-brand' sticky='top'>
				<Container>
					<Navbar.Brand href='/'>
						<img
							alt=''
							src={budgetingLogo}
							width='30'
							height='30'
							className='d-inline-block align-top'
						/>{' '}
						<span className='nav-span'>Budgeting App</span>
					</Navbar.Brand>
					<Nav.Link
						href='/transactions/new'
						className='justify-content-end mt-2 mb-2 me-2'
					>
						<Button
							as='input'
							className='navbar-new-button'
							variant='success'
							type='submit'
							size='md'
							value='New Transaction'
						/>
					</Nav.Link>
				</Container>
			</Navbar>
		</>
	);
}

export default NavBar;
