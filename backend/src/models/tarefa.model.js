const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: String,
  },
});

const TarefaModel = mongoose.model("Tarefas", tarefaSchema);

module.exports = TarefaModel;
