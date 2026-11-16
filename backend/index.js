const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/connect");
dotenv.config();

async function iniciarServidor() {
  await connectToDatabase();
  require("./modules/express");
}

iniciarServidor().catch((error) => {
  console.error("Não foi possível iniciar o servidor", error);
  process.exitCode = 1;
});
