const Pesanan = require('../models/pesanan');

exports.getTodo = async (req, res, next) => {
  const pesan = await Pesanan.find();
  res.status(200).json({
    pesanan: pesan,
  });
};

exports.postTodo = async (req, res, next) => {
  const nama = req.body.nama;
  const pesan = req.body.pesan;
  const createPesan = new Pesanan({
    nama: nama,
    pesanan: pesan,
  });
  try {
    let order = await createPesan.save();
    res.status(201).json({
      message: 'Pesanan berhasil dibuat',
      errStatus: false,
      pesanan: order,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Pesanan gagal dibuat';
      err.statusCode = 500;
      err.errStatus = true;
    }
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  const todoId = req.params.todoId;
  const editNama = req.body.nama;
  const editPesan = req.body.pesan;
  try {
    const order = await Pesanan.findById(todoId);
    if (!order) {
      res.status(404).json({
        message: 'Pesanan tidak ditemukan',
        errStatus: true,
      });
    }
    order.nama = editNama;
    order.pesanan = editPesan;
    const updatedPesanan = await order.save();
    res.status(200).json({
      message: 'Pesanan berhasil di update',
      errStatus: false,
      pesanan: updatedPesanan,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Pesanan gagal diupdate';
      err.statusCode = 500;
      err.errStatus = true;
    }
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  const todoId = req.params.todoId;
  try {
    const deleteTodo = await Pesanan.findByIdAndRemove(todoId);
    res.status(200).json({
      message: 'Pesanan berhasil di hapus',
      errStatus: false,
      pesanan: deleteTodo,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Pesanan gagal dihapus';
      err.statusCode = 500;
      err.errStatus = true;
    }
    next(err);
  }
};
