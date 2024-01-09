const express = require("express");

const productController = require("../controller/product");
const router = express.Router();

router
  .post("/", productController.createProduct)
  .get("/ssr", productController.getAllproductsSSR)
  .get("/add", productController.getAllproductsADD)
  .get("/", productController.getAllproducts)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct)

exports.router = router;
