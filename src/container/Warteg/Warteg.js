import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography } from '@material-ui/core';
import Order from '../../components/Order/Order';
import Pesan from '../../components/Pesan/Pesan';
import OrderAPI from '../../API/Api';

const Warteg = () => {
	const [order, setOrder] = useState([]);
	const [pesanan, setPesanan] = useState({ nama: '', pesan: '' });
	const [isEdit, setEdit] = useState(false);
	const [messageErr, setMessage] = useState('');
	const [errStats, setStatus] = useState(false);

	useEffect(() => {
		OrderAPI.getPesanan().then(res => {
			setOrder(res.pesanan);
		});
	}, []);

	const changeHandler = useCallback(
		e => {
			setPesanan({
				...pesanan,
				[e.target.name]: e.target.value,
			});
		},
		[pesanan]
	);

	const buatPesan = async e => {
		e.preventDefault();
		const updateOrder = await OrderAPI.createPesanan(pesanan);
		let pesan = updateOrder.message;
		if (updateOrder.errStatus) {
			setStatus(updateOrder.errStatus);
			setMessage(pesan);
		} else {
			const getUpdate = await OrderAPI.getPesanan();
			setOrder(getUpdate.pesanan);
			setMessage(pesan);
		}
		resetForm();
	};

	const hapusPesanan = async id => {
		const updateDelete = await OrderAPI.deletePesanan(id);
		let pesan = updateDelete.message;
		if (updateDelete.errStatus) {
			setStatus(updateDelete.errStatus);
			setMessage(pesan);
		} else {
			const getUpdate = await OrderAPI.getPesanan();
			setOrder(getUpdate.pesanan);
			setMessage(pesan);
		}
	};

	const editPesanan = async e => {
		e.preventDefault();
		const updatedPesan = await OrderAPI.updatePesanan(pesanan);
		let pesan = updatedPesan.message;
		if (updatedPesan.errStatus) {
			setStatus(updatedPesan.errStatus);
			setMessage(pesan);
		} else {
			const getUpdate = await OrderAPI.getPesanan();
			setOrder(getUpdate.pesanan);
			setMessage(pesan);
			setEdit(false);
		}
		resetForm();
	};

	const goEdit = id => {
		const findOrder = order.find(item => item._id === id);
		setPesanan({
			...findOrder,
			nama: findOrder.nama,
			pesan: findOrder.pesanan,
		});
		setEdit(true);
	};

	const cancelEdit = () => {
		setEdit(false);
		resetForm();
	};

	// Utility Functions
	const resetForm = () => {
		setPesanan({ nama: '', pesan: '' });
	};

	return (
		<Container>
			<Typography variant="h2" gutterBottom>
				Warung Nasi MBCH
			</Typography>
			<hr />
			<Order
				editMode={goEdit}
				message={messageErr}
				msgStatus={errStats}
				hapus={hapusPesanan}
				pesan={order}
			/>
			<div>
				<Typography
					style={{ marginTop: '2rem' }}
					variant="h4"
					gutterBottom>
					{isEdit ? 'Edit Order' : 'Create Order'}
				</Typography>
			</div>
			<Pesan
				order={pesanan}
				edit={isEdit}
				clickBuat={isEdit ? editPesanan : buatPesan}
				cancel={cancelEdit}
				inputPesan={changeHandler}
			/>
		</Container>
	);
};

export default React.memo(Warteg);
