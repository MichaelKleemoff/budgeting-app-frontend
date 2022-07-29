/** @format */

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const API = process.env.REACT_APP_API_URL;

function TransactionNewForm() {
	const navigate = useNavigate();

	const [transaction, setTransaction] = useState({
		item_name: '',
		amount: 0,
		date: '',
		from: '',
		category: '',
		description: '',
		type: '',
	});

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

	const handleRadioButtonChange = (event) => {
		setTransaction({
			...transaction,
			type: event.target.value,
		});
	};

	const handleSelectChange = (event) => {
		setTransaction({
			...transaction,
			category: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		addTransaction();
	};

	return (
		<>
			<Form className='transaction-new' onSubmit={handleSubmit}>
				<Form.Group as={Row} className='m-2' size='md' controlId='item_name'>
					<Form.Label>Transaction:</Form.Label>
					<Form.Control
						name='item_name'
						type='text'
						onChange={handleTextChange}
						placeholder='Name of Transaction'
						required
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='amount'>
					<Form.Label>$ Amount: </Form.Label>
					<Form.Control
						name='amount'
						type='text'
						placeholder='Amount'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='date'>
					<Form.Label>Date:</Form.Label>
					<Form.Control
						type='date'
						name='date'
						placeholder='mm/dd/yyyy'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='from'>
					<Form.Label>From:</Form.Label>
					<Form.Control
						type='text'
						name='from'
						placeholder='From'
						required
						onChange={handleTextChange}
					/>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='amount'>
					<Form.Label>Category:</Form.Label>
					<Form.Select
						name='category'
						placeholder='Type of Transaction'
						required
						onChange={handleSelectChange}
					>
						<option>-- Please select a category --</option>
						<option value='Personal Checking'>Personal Checking</option>
						<option value='Personal Savings'>Personal Savings</option>
						<option value='Business Checking'>Business Checking</option>
						<option value='Business Savings'>Business Savings</option>
						<option value='Income'>Income</option>
						<option value='Car Finance'>Car Finance</option>
						<option value='Car Insurance'>Car Insurance</option>
						<option value='Gasoline'>Gasoline</option>
						<option value='Electricity'>Electricity</option>
						<option value='Internet/Cable'>Internet/Cable</option>
						<option value='Groceries'>Groceries</option>
						<option value='Clothes'>Clothes</option>
						<option value='Entertainment'>Entertainment</option>
						<option value='Miscellaneous'>Miscellaneous</option>
					</Form.Select>
				</Form.Group>
				<Form.Group as={Row} className='m-2' controlId='description'>
					<Form.Label>Description:</Form.Label>
					<Form.Control
						name='description'
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
								onChange={handleRadioButtonChange}
							/>
							<Form.Check
								inline
								label='debit'
								name='type'
								type={type}
								id={`inline-${type}-debit`}
								value='debit'
								checked={transaction.type === 'debit'}
								onChange={handleRadioButtonChange}
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

export default TransactionNewForm;
