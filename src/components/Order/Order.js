import React from 'react';

// Material Component
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	makeStyles,
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

// Material Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	pesan: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	container: {
		maxHeight: 400,
	},
});

const Order = ({ pesan, hapus, message, msgStatus, editMode }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				{message !== '' ? (
					<Alert severity="success">{message}</Alert>
				) : null}
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>
								<strong>Nama</strong>
							</TableCell>
							<TableCell>
								<strong>Pesanan</strong>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{pesan
							.map(order => (
								<TableRow key={order._id}>
									<TableCell>{order.nama}</TableCell>
									<TableCell>
										<div className={classes.pesan}>
											{order.pesanan}
											<div>
												<Button
													onClick={editMode.bind(
														this,
														order._id
													)}
													color="primary"
													startIcon={<EditIcon />}>
													Edit
												</Button>
												<Button
													onClick={hapus.bind(
														this,
														order._id
													)}
													color="secondary"
													endIcon={<DeleteIcon />}>
													Hapus
												</Button>
											</div>
										</div>
									</TableCell>
								</TableRow>
							))
							.reverse()}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default Order;
