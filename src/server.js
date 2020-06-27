const express = require("express")
const server = express()



//pegar o banco de dados

const db = require("./database/db")


//configurar pasta publica
//configuração do servidor 
server.use(express.static("public"))

//utilizando template engine
const nunjucks = require("nunjucks")


nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

//configurar caminhos da minha aplicação

//pagina inicial
//get é um verbo http
//req : é uma requisição
//res: resposta
server.get("/", (req, res) => {
  //__dirname se refere ao diretorio
  return res.render("index.html", { title: "Um titulo" })
  //o render vai entender que temos o nunjucks  , entendendo a configuração 
  //express:server
})


server.get("/create-point", (req, res) => {
  //__dirname se refere ao diretorio
  return res.render("create-point.html")
})

server.get("/search", (req, res) => {

  //pegar os dados no banco de dados

  //consultar os dados da tabela
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err)
    }

    console.log("aqui estãos seus registros")
    console.log(rows)
    return res.render("search-result.html", { places: rows })
  })

  //MOSTRAR A PAGINA HTML COM OS DADOS DO  BANCO DE DADOS


  //__dirname se refere ao diretorio

})


//modelo usado antes do nunjucks
//server.get("/search-result", (req, res) => {
//__dirname se refere ao diretorio
//res.sendFile(__dirname + "/views/search-result.html")
//})
//ligar o sevidor
server.listen(3000)