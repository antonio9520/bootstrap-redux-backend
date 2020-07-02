const Producto = require("../models/ProductoModel");

exports.productoPost = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    if (req.file) {
      const { filename } = req.file;
      producto.setImgUrl(filename);
    }
    producto.save();
    res.send({ producto });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No se pudo agregar el producto" });
  }
};

exports.productoGet = async (req, res) => {
  try {
    const producto = await Producto.find().sort({
      registro: -1,
    });
    res.send({ producto });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No se pueden obtener los productos" });
  }
};

exports.productoPut = async (req, res) => {
  const { nombre, status, stock, precio, imageURL } = req.body;
  const nuevoproducto = {};
  if (nombre) {
    nuevoproducto.nombre = nombre;
  }
  if (status) {
    nuevoproducto.status = status;
  }
  if (stock) {
    nuevoproducto.stock = stock;
  }
  if (precio) {
    nuevoproducto.precio = precio;
  }
  if (req.file) {
    const { filename } = req.file;
    producto.setImgUrl(filename);
  }
  try {
    const existe = await Producto.findById(req.params.id);

    if (!existe) {
      return res.status(404).json({ msg: "El proyecto no existe" });
    }

    const producto = await Producto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoproducto },
      { new: true }
    );
    res.send(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo actualizar el producto" });
  }
};

exports.productoDelete = async (req, res) => {
  try {
    let producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ msg: "No se encontro el proyecto" });
    }
    await Producto.findOneAndRemove({ _id: req.params.id });
    res.send({ msg: "Producto eliminado con exito" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No se puede eliminar el producto" });
  }
};
