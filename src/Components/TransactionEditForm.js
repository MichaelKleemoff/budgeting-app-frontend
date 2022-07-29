/** @format */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const API = process.env.REACT_APP_API_URL;

function TransactionEditForm() {
	let { index } = useParams();
	const navigate = useNavigate();

	const [transaction, setTransaction] = useState({
		item_name: '',
		amount: '',
		date: '',
		from: '',
		category: '',
		description: '',
		type: '',
	});

	useEffect(() => {
		axios
			.get(`${API}/transactions/${index}`)
			.then((response) => setTransaction(response.data))
			.catch((error) => console.log(error));
	}, [index]);

	const updateTransaction = () => {
		axios
			.put(`${API}/transactions/${index}`, transaction)
			.then((response) => {
				setTransaction(response.data);

				navigate(`/transactions/${index}`);
			})
			.catch((error) => console.error(error));
	};

	const handleTextChange = (event) => {
		setTransaction({ ...transaction, [event.target.id]: event.target.value });
	};

	const handleCheckboxChange = (event) => {
		setTransaction({
			...transaction,
			type: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		updateTransaction();
	};

	if (transaction.type === 'credit') {
		transaction.amount = -Number(transaction.amount);
	} else {
		transaction.amount = Number(transaction.amount);
	}

	return (
		<>
			<Form className='transaction-edit' onSubmit={handleSubmit}>
				<Form.Group as={Row} className='m-2' size='md' controlId='item_name'>
					<Form.Label>Transaction:</Form.Label>
					<Form.Control
						name='item_name'
						value={transaction.item_name}
						type='text'
						placeholder='Name of Transaction'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='amount'>
					<Form.Label>$ Amount: </Form.Label>
					<Form.Control
						name='amount'
						type='text'
						value={transaction.amount}
						placeholder='Amount'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='date'>
					<Form.Label>Date:</Form.Label>
					<Form.Control
						type='text'
						name='date'
						value={transaction.date}
						placehoder='yyyy-mm-dd'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='from'>
					<Form.Label>From:</Form.Label>
					<Form.Control
						type='text'
						name='from'
						value={transaction.from}
						placeholder='From'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='category'>
					<Form.Label>Category:</Form.Label>
					<Form.Control
						name='category'
						value={transaction.category}
						placeholder='Type of Transaction'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='description'>
					<Form.Label>Description:</Form.Label>
					<Form.Control
						name='description'
						value={transaction.description}
						as='textarea'
						style={{ height: '100px' }}
						placeholder='Description'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='type'>
					<Form.Label>Type:</Form.Label>
					{['radio'].map((type) => (
						<div key={`inline-${type}`} className='mt-2 ms-3 mb-4'>
							<Form.Check
								inline
								label='credit'
								name='type'
								type={type}
								id={`inline-${type}-credit`}
								value='credit'
								checked={transaction.type === 'credit'}
								onChange={handleCheckboxChange}
							/>
							<Form.Check
								inline
								label='debit'
								name='type'
								type={type}
								id={`inline-${type}-debit`}
								value='debit'
								checked={transaction.type === 'debit'}
								onChange={handleCheckboxChange}
							/>
						</div>
					))}
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
		</>
	);
}

export default TransactionEditForm;
