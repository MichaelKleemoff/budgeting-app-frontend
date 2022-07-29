/** @format */

import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const API = process.env.REACT_APP_API_URL;

function TransactionDetails() {
	const [transaction, setTransaction] = useState({});
	let { index } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${API}/transactions/${index}`)
			.then((response) => setTransaction(response.data))
			.catch((error) => navigate('/*'));
	}, [index, navigate]);

	const handleDelete = () => {
		axios
			.delete(`${API}/transactions/${index}`)
			.then((response) => {
				navigate('/transactions');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			<article className='transaction-details'>
				<h3>{transaction.item_name}</h3>
				<br />
				<h4>${transaction.amount}</h4>
				<br />
				<p>
					<strong>From: </strong> {transaction.from}
				</p>
				<p>
					<strong>Category: </strong>
					{transaction.category}
				</p>
				<p>
					<strong>Type: </strong> {transaction.type}
				</p>
				<p>
					<strong>Date: </strong> {transaction.date}
				</p>
				<p>
					<strong>Description: </strong> {transaction.description}
				</p>
			</article>
			<div className='showNavigation'>
				<Link to={`/transactions`}>
					<Button
						as='input'
						variant='success'
						className='navbar-new-button'
						type='button'
						size='md'
						value='Back'
					/>
				</Link>
				<Link to={`/transactions/${index}/edit`}>
					<Button
						as='input'
						variant='success'
						className='navbar-new-button'
						type='submit'
						size='md'
						value='Edit Transaction'
					/>
				</Link>{' '}
				<Link to={`/transactions`}>
					<Button
						as='input'
						variant='danger'
						className='navbar-new-button'
						type='submit'
						size='md'
						onClick={handleDelete}
						value='Delete'
					/>
				</Link>
			</div>
		</>
	);
}

export default TransactionDetails;
