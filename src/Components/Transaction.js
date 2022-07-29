/** @format */

import { Link } from 'react-router-dom';

function Transaction({ transaction, index }) {
	return (
		<tr>
			<td>{transaction.date}</td>
			<td>
				<Link to={`/transactions/${index}`} className='transLink-td-color'>
					{transaction.item_name}
				</Link>
			</td>
			<td>{transaction.type}</td>
			<td>{transaction.amount}</td>
		</tr>
	);
}

export default Transaction;
