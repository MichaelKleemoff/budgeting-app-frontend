/** @format */

import { useState, useEffect } from 'react';
import Transaction from './Transaction';
import Table from 'react-bootstrap/Table';

// this is our new package for making API calls
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
// Request for data must come AFTER component is loaded to the DOM otherwise we have a RACE condition - page might be done before data arrives;

function Transactions() {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		axios
			.get(`${API}/transactions`)
			.then((response) => {
				setTransactions(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const transAmountArray = transactions.map((transaction) => {
		return Number(transaction.amount);
	});

	const totalTransAmount = transAmountArray.reduce(
		(prevAmount, currentAmount) => {
			return Number(prevAmount + currentAmount);
		},
		0
	);

	let colorTotalTransAmount = '';

	if (totalTransAmount > 1000) {
		colorTotalTransAmount = 'green';
	} else if (totalTransAmount >= 0 && totalTransAmount <= 1000) {
		colorTotalTransAmount = 'gray';
	} else {
		colorTotalTransAmount = 'red';
	}

	return (
		<>
			<h3>
				Total:{' '}
				<span style={{ color: colorTotalTransAmount }}>
					${totalTransAmount}
				</span>
			</h3>
			<div className='Transactions m-3 p-3'>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Date</th>
							<th>Transaction</th>
							<th>Type</th>
							<th>$ Amount</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction, index) => {
							return (
								<Transaction
									key={index}
									transaction={transaction}
									index={index}
								/>
							);
						})}
					</tbody>
				</Table>
			</div>
		</>
	);
}

export default Transactions;
