const express = require("express");
const ProductoC = require("../controllers/ProductoC");
const upload = require("../libs/storage");

const router = express.Router();

router.post("/", upload.single("imageURL"), ProductoC.productoPost);

router.get("/", ProductoC.productoGet);

router.put("/:id", upload.single("imageURL") ,ProductoC.productoPut);

router.delete("/:id", ProductoC.productoDelete)
module.exports = router;
