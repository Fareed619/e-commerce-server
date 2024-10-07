import express from "express";
import Product from "../models/Products.js";
import { auth } from "../utils/index.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images", // path that you want to store the images in
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

// UPLOAD IMAGES

router.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file);
  try {
    res.json({
      success: true,
      image_url: `http://localhost:4000/images/${req.file.filename}`,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// TO ADD A NEW PRODUCT
router.post("/addproduct", async (req, res) => {
  const { image, category, new_price, old_price, name } = req.body;

  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
    const newProduct = new Product({
      image,
      id,
      // user: req.user.id,
      name,
      category,
      new_price,
      old_price,
    });
    console.log(newProduct);
    const savedProduct = await newProduct.save();
    console.log("saved");
    return res.status(201).json({
      msg: "success",
      product: savedProduct,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// TO DELETE A PRODUCT
router.post("/deleteproduct", async (req, res) => {
  const { id, name } = req.body;
  try {
    await Product.findOneAndDelete({ id });
    return res.status(200).json({
      success: true,
      product_name: name,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET ALL PRODUCTS FROM DB
router.get("/allproducts", async (req, res) => {
  try {
    const allProducts = await Product.find();

    return res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/men/products", async (req, res) => {
  try {
    const mensProducts = await Product.find({ category: "men" });
    return res.status(200).json(mensProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.get("/women/products", async (req, res) => {
  try {
    const womensProducts = await Product.find({ category: "women" });
    return res.status(200).json(womensProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.get("/kid/products", async (req, res) => {
  try {
    const kidsProducts = await Product.find({ category: "kid" });
    return res.status(200).json(kidsProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default router;
