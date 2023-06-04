const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllProducts = async (req, res) => {
  try{
  const result = await mongodb.getDb().db('Project_week_5_to_8').collection('Products').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllProductsBySeller = async (req, res) => {
    try {
      const userName = req.params.userName; 
      const result = await mongodb.getDb().db('Project_week_5_to_8').collection('Products').find({ userName: userName });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };



const createProduct = async (req, res) => {
  try {
    const product = {
      productName: req.body.productName,
      brand: req.body.brand,
      color: req.body.color,
      initialPrice: req.body.initialPrice,
      declutterPrice: req.body.declutterPrice,
      condition: req.body.condition,
      description: req.body.description,
      location: req.body.location,
      userName: req.body.userName

    };
    const response = await mongodb.getDb().db('Project_week_5_to_8').collection('Products').insertOne(product);
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
    // be aware of updateOne if you only want to update specific fields
    const product = {
      productName: req.body.productName,
      brand: req.body.brand,
      color: req.body.color,
      initialPrice: req.body.initialPrice,
      declutterPrice: req.body.declutterPrice,
      condition: req.body.condition,
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
    const response = await mongodb.getDb().db('Project_week_5_to_8').collection('Products').deleteOne({ _id: productId }, true);
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
    getAllProductsBySeller,
    createProduct,
    updateProduct,
    deleteProduct
  };