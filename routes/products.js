const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
     
    });

    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product by ID
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const removedProduct = await     Product.findByIdAndDelete(req.params.id);
    res.json(removedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
