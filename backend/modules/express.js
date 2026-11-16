const express = require("express");
const TarefaModel = require("../src/models/tarefa.model");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tarefas", async (req, res) => {
  try {
    const tarefa = new TarefaModel(req.body);
    await tarefa.save();
    return res.status(201).json(tarefa);
  } catch (error) {
    return res.status(400).json({
      mensagem: "Erro ao salvar tarefa",
      error: error.message,
    });
  }
});

app.get("/tarefas", async (req, res) => {
  try {
    const tarefas = await TarefaModel.find();
    return res.status(200).json(tarefas);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar todas as tarefas.",
      detallhes: error.message,
    });
  }
});

// app.get("/users", async (req, res) => {
//   try {
//     const users = await UserModel.find({});
//     res.status(201).json(users);
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// });

const port = 8080;

app.listen(port, () => console.log("Rodando com express na porta:", port));
