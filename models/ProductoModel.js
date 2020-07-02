const mongoose = require("mongoose");
const { appConfig } = require("../config/config");

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    trim: true,
  },
  precio: {
    type: Number,
    trim: true,
  },
  imageURL: {
    type: String,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
});

ProductoSchema.methods.setImgUrl = function setImgUrl(filename) {
  const { host, port } = appConfig;
  this.imageURL = `${host}:${port}/public/${filename}`;
};

module.exports = mongoose.model("Producto", ProductoSchema);
