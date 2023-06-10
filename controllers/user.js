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
    const userName = req.params.userName;
    if (!userName) {
      return res.status(400).json('Must provide a valid username to find a user.');
    }

    const result = await mongodb
      .getDb()
      .db('Project_week_5_to_8')
      .collection('Users')
      .find({ userName: userName })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json('User not found.');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
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
  try{
    const userName = req.params.userName;
      if (!userName) {
        return res.status(400).json('Must use a valid user name to find a user.');
      }

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
      .replaceOne({ userName: userName }, user);
    // console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('User not found.');
    }
  } catch (error) {
      console.error(error);
      res.status(500).json('An error occurred while updating the user.');
  };
}
    
  
  const deleteUser = async (req, res) => {
    try {
      const userName = req.params.userName;
      if (!userName) {
        return res.status(400).json('Must use a valid user name to find a user.');
      }
  
      
      const response = await mongodb.getDb().db('Project_week_5_to_8').collection('Users').deleteOne({ userName: userName }, true);
      // console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json('User not found.');
      }
    } catch (error) {
      console.error(error)
      res.status(500).json(err ||'An error occurred while deleting the user.');
    }
  };
  
  module.exports = {
    getAllUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
  };