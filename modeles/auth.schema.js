const { ObjectId } = require('mongodb');

function createUserSchema(email, password) {
  return {
    _id: new ObjectId(),
    email,
    password, // Note: In a real-world application, you should hash the password before saving it
    createdAt: new Date(),
  };
}

module.exports = {
  createUserSchema,
};