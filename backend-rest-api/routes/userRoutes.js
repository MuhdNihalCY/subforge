const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  createUser, 
  getUserById,
  updateUser,
  deleteUser 
} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
