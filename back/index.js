const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const conn = require("./db/conn");
const User = require("./model/User");

const PORT = 3000;
const hostname = "localhost";
/* ---------------------------------------------------------------------------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
/* ---------------------------------------------------------------------------------- */
app.post("/login", async (req, res) => {
  const login = req.body;
  console.log(login);
  try {
    const pesq = await User.findOne({
      where: { email: login.email },
      raw: true,
    });
    console.log(pesq);
    if (pesq === null) {
      console.log("Usuário Inexistente");
      res.status(404).json("Usuário Inexistente no banco");
    } else if (pesq.email == login.email) {
      bcrypt.compare(login.senha, pesq.senha, (err, result) => {
        if (err) {
          console.log("Erro ao verificar criptografia!", err);
          res.status(500).json({ message: "Erro ao verificar criptografia!" });
        } else if (result) {
          console.log("Senha Correta!");
          res.status(200).json({ message: "Senha Correta!" });
        } else {
          console.log("Senha Incorreta!");
          res.status(404).json({ message: "Senha Incorreta!" });
        }
      });
    }
  } catch (err) {
    console.error("Erro a consultar usuário no banco!", err);
    res.status(500).json("Erro a consultar usuário no banco!");
  }
});

app.post("/register", (req, res) => {
  const reg = req.body;
  console.log(reg);

  bcrypt.hash(reg.senha, 10, async (err, hash) => {
    if (err) {
      console.log("Erro ao Gerar Hash");
    }
    try {
      const rec = await User.create({
        nome: reg.nome,
        email: reg.email,
        senha: hash,
      });
      console.log(rec);
      res.status(500).json({ message: "Sua Conta foi Criada com Sucesso!!" });
    } catch (err) {
      res.status(400).json({ message: "Erro ao Gravar Dados", err });
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Servidor Ativo!" });
});
/* ---------------------------------------------------------------------------------- */
conn
  .sync()
  .then(() => {
    app.listen(PORT, hostname, () => {
      console.log(`Servidor Rodando em ${hostname}:${PORT}`);
    });
  })
  .catch(() => {
    console.error("Erro de conexão com banco de dados");
  });
