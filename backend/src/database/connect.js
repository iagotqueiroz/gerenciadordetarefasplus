const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejs.g8ehd13.mongodb.net/`);

    console.log("Conexão ao banco de dados realizada com sucesso!");


  } catch (error) {
    console.error("Ocorreu um erro ao se conectar ao banco de dados:", error);
    throw error;
  }
};

module.exports = connectToDatabase;
