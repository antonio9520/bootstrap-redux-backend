const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

connectDB();

app.use(express.json({ extended: true }));
app.use(cors());
const port = process.env.PORT || 4000;
app.use("/public", express.static(`${__dirname}/storage/img`));
app.use("/api/productos", require("./routes/productos"));
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
