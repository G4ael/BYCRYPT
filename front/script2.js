const login = document.getElementById("li");
const res = document.getElementById("res");

login.addEventListener("click", () => {
  const email = document.getElementById("email2").value;
  const senha = document.getElementById("senha2").value;

  const data = {
    email: email,
    senha: senha,
  };

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resposta) => resposta.json())
    .then((dados) => {
      console.log(dados);
    })
    .catch((err) => {
      console.error("erro de busca de dados", err);
    });
});
