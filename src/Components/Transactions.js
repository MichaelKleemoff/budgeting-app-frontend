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
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const transAmountArray = transactions.map((transaction) => {
		return transaction.amount;
	});

	const totalTransAmount = transAmountArray.reduce(
		(prevAmount, currentAmount, index) => {
			return prevAmount + currentAmount;
		},
		0
	);

	return (
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
			<h2>Total: ${totalTransAmount}</h2>
		</div>
	);
}

export default Transactions;
