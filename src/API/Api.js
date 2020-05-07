export default {
	getPesanan: () => {
		return fetch('http://localhost:8080/todo')
			.then(res => res.json())
			.then(data => data);
	},
	createPesanan: order => {
		return fetch('http://localhost:8080/todo', {
			method: 'POST',
			body: JSON.stringify(order),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => data);
	},
	updatePesanan: order => {
		return fetch(`http://localhost:8080/todo/${order._id}`, {
			method: 'PUT',
			body: JSON.stringify(order),
			headers: { 'Content-Type': 'application/json' },
		})
			.then(res => res.json())
			.then(data => data);
	},
	deletePesanan: _id => {
		return fetch(`http://localhost:8080/todo/${_id}`, {
			method: 'DELETE',
		})
			.then(res => res.json())
			.then(data => data);
	},
};
