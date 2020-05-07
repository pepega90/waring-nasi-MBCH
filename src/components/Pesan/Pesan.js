import React from 'react';
import { TextField, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
	input: {
		marginTop: '1.2rem',
	},
	buttonGroup: {
		margin: '1rem',
	},
	button: {
		margin: '0 5px',
	},
});

const Pesan = ({ clickBuat, inputPesan, order, edit, cancel }) => {
	const classes = useStyles();
	return (
		<div>
			<form novalidate onSubmit={clickBuat}>
				<div className={classes.input}>
					<TextField
						onChange={inputPesan}
						style={{ width: '60%' }}
						value={order.nama}
						id="standard-textarea"
						label="Nama"
						placeholder="Masukkan Nama..."
						multiline
						name="nama"
					/>
				</div>
				<div className={classes.input}>
					<TextField
						onChange={inputPesan}
						style={{ width: '60%' }}
						value={order.pesan}
						id="standard-textarea"
						label="Pesanan"
						placeholder="Masukkan Pesanan..."
						multiline
						name="pesan"
					/>
				</div>
				<div className={classes.buttonGroup}>
					<Button
						onClick={clickBuat}
						className={classes.button}
						variant="contained"
						color="primary">
						{edit ? 'Edit Pesan' : 'Add Pesan'}
					</Button>
					{edit && (
						<Button
							onClick={cancel}
							className={classes.button}
							variant="contained">
							Cancel
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default Pesan;
