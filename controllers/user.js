const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUser = async (req, res) => {
  try{
  const result = await mongodb.getDb().db('Project_week_5_to_8').collection('Users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleUser = async (req, res) => {
  try {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('Project_week_5_to_8')
    .collection('Users')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
} catch (err) {
  res.status(500).json(err);
}
};

const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password

    };
    const response = await mongodb.getDb().db('Project_week_5_to_8').collection('Users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
  };
  
  const updateUser = async (req, res) => {
    try {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password

      };
    const response = await mongodb
      .getDb()
      .db('Project_week_5_to_8')
      .collection('Users')
      .replaceOne({ _id: userId }, user);
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
  
  const deleteUser = async (req, res) => {
    try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('Project_week_5_to_8').collection('Users').deleteOne({ _id: userId }, true);
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
    getAllUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
  };