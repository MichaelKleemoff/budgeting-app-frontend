/** @format */

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const API = process.env.REACT_APP_API_URL;

function TransactionNewForm() {
	const [transaction, setTransaction] = useState({
		item_name: '',
		amount: '',
		date: '',
		from: '',
		category: '',
		description: '',
		type: '',
	});

	const navigate = useNavigate();

	const addTransaction = () => {
		axios
			.post(`${API}/transactions`, transaction)
			.then(() => {
				return navigate(`/transactions`);
			})
			.catch((error) => console.error(error));
	};

	const handleTextChange = (event) => {
		setTransaction({ ...transaction, [event.target.id]: event.target.value });
	};

	const handleCheckboxChange = () => {
		setTransaction({
			...transaction,
			credit: !transaction.credit,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		addTransaction();
	};
	return (
		<div>
			<Form className='transaction-new' onSubmit={handleSubmit}>
				<Form.Group as={Row} className='m-2' size='md' controlId='item_name'>
					<Form.Label htmlFor='item_name' column sm={2}>
						Transaction:
					</Form.Label>
					<Form.Control
						id='item_name'
						name='item_name'
						type='text'
						onChange={handleTextChange}
						placeholder='Name of Transaction'
						required
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='amount'>
					<Form.Label htmlFor='amount'>$ Amount: </Form.Label>
					<Form.Control
						id='amount'
						name='amount'
						type='text'
						placeholder='Amount'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='date'>
					<Form.Label htmlFor='date'>Date:</Form.Label>
					<Form.Control
						id='date'
						type='date'
						name='date'
						placeholder='mm/dd/yyyy'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='from'>
					<Form.Label htmlFor='from'>From:</Form.Label>
					<Form.Control
						id='from'
						type='text'
						name='from'
						placeholder='From'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='amount'>
					<Form.Label htmlFor='category'>Category:</Form.Label>
					<Form.Control
						id='category'
						name='category'
						placeholder='Type of Transaction'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group className='m-2' controlId='credit'>
					<Form.Label htmlFor='credit'>Credit:</Form.Label>{' '}
					<Form.Control
						id='credit'
						type='checkbox'
						onChange={handleCheckboxChange}
						checked={transaction.credit}
					/>
				</Form.Group>
				<div className='showNavigation'>
					<Link to='/transactions'>
						<Button
							as='input'
							variant='success'
							className='navbar-new-button'
							type='submit'
							size='md'
							value='Back'
						/>
					</Link>{' '}
					<Button
						as='input'
						variant='success'
						className='navbar-new-button'
						type='submit'
						size='md'
						value='Submit'
					/>
				</div>
			</Form>
		</div>
	);
}

export default TransactionNewForm;
