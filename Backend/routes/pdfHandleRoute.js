const express = require("express");
const { pdfProcessingFunction, 
        pdfSearchFunction, 
        deletePdfFromVectorStoreFunction 
        } = require("../controllers/pdfFunction");

const router = express.Router();

router.post("/process-pdf", pdfProcessingFunction);

router.post("/search-pdf", pdfSearchFunction);

router.post("/delete-pdf", deletePdfFromVectorStoreFunction);
module.exports = router;