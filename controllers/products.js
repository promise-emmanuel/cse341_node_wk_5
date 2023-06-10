const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllProducts = async (req, res) => {
  try{
  const result = await mongodb
    .getDb()
    .db('Project_week_5_to_8')
    .collection('Products').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (err) {
    res.status(500).json(err);
  }
};

// const getAllProductsBySeller = async (req, res) => {
    // try {
      // const userName = req.params.userName; 
      // if (!userName) {
        // return res.status(400).json('Must provide a valid username to find a product.');
      // }
      // const result = await mongodb
        // .getDb().db('Project_week_5_to_8')
        // .collection('Products')
        // .find({ userName: userName });
      // result.toArray().then((lists) => {
        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json(lists);
      // });
    // } catch (err) {
      // res.status(500).json(err);
    // }
  // };


  const getProductsBySearch = async (req, res) => {
    try {
      const query = req.params.query;
      if (!query) {
        return res.status(400).json('Must provide a valid search word to find a product.');
      }
      
      // Construct the query object to match any field containing the query value
      const searchQuery = {
        $or: [
          { userName: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } },
          { productName: { $regex: query, $options: 'i' } }
        ]
      };
  
      const products = await mongodb
        .getDb()
        .db('Project_week_5_to_8')
        .collection('Products')
        .find(searchQuery)
        .toArray();
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json('An error occurred while fetching the products.');
    }
  };

const createProduct = async (req, res) => {
  try {
    const product = {
      userName: req.body.userName,
      productName: req.body.productName,
      brand: req.body.brand,
      category: req.body.category,
      color: req.body.color,
      declutterPrice: req.body.declutterPrice,
      description: req.body.description,
      location: req.body.location
    };
    const response = await mongodb
      .getDb()
      .db('Project_week_5_to_8')
      .collection('Products')
      .insertOne(product);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const productId = new ObjectId(req.params.id);
      if (!productId) {
        return res.status(400).json('Must provide a valid product ID update a product.');
      }
    // be aware of updateOne if you only want to update specific fields
    const product = {
      userName: req.body.userName,
      productName: req.body.productName,
      brand: req.body.brand,
      color: req.body.color,
      declutterPrice: req.body.declutterPrice,
      description: req.body.description,
      location: req.body.location
      };
    const response = await mongodb
      .getDb()
      .db('Project_week_5_to_8')
      .collection('Products')
      .replaceOne({ _id: productId }, product);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
  };
  
  const deleteProduct = async (req, res) => {
    try {
    const productId = new ObjectId(req.params.id);
    if (!productId) {
      return res.status(400).json('Must provide a valid product ID to delete a product.');
    }
    const response = await mongodb
      .getDb().db('Project_week_5_to_8')
      .collection('Products')
      .deleteOne({ _id: productId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
  };
  
  module.exports = {
    getAllProducts,
    getProductsBySearch,
    createProduct,
    updateProduct,
    deleteProduct
  };