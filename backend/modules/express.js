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

app.patch("/tarefa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id recebido:", id);
    const { titulo, descricao, status, date } = req.body;
    const atualizacoes = {
      titulo,
      descricao,
      status,
      date,
    };

    const tarefasAtualizadas = await TarefaModel.findByIdAndUpdate(
      id,
      {
        $set: atualizacoes,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    return res.status(200).json(tarefasAtualizadas);
  } catch (error) {
    res.status(400).json({
      mensagem: "Erro ao atualizar tarefa",
    });
  }
});

app.delete("/tarefa/:id", async (req, res) => {
  try {
    const deleteTarefa = await TarefaModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ error: "usuário deletado com sucesso" });
  } catch (error) {
    return res.status(400).json({
      mensagem: "Erro ao apagar tarefa",
      user: deleteTarefa,
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
