const express = require("express");
const cors = require("cors")
const pdfHandleRoute = require("./routes/pdfHandleRoute");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/pdf", pdfHandleRoute);

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})