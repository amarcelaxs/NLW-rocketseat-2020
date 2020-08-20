const express = require("express")
const server = express()



//pegar o banco de dados

const db = require("./database/db")


//habilitar o uso do req.bodyna nossa aplicação
server.use(express.urlencoded({ extended: true }))

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
  //req.query:query strings da nossa url  
  console.log(req.query);

  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
  //req.body:o corpo do nosso formulario
  //console.log(req.body)






  //inserir dados no banco de dados

  // //2 inserir dados na tabela
  const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state, 
                city,
                items

            ) VALUES (?,?,?,?,?,?,?);
    `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items

  ]

  function afterInserData(err) {
    if (err) {
      return res.send("Erro no cadastro!")

    }
    console.log("Cadastrado com Sucesso")
    console.log(this)

    return res.render("create-point.html", { saved: true })
  }

  db.run(query, values, afterInserData)






})



server.get("/search", (req, res) => {

  const search = req.query.search

  if (search == "") {
    //pesquisa vazia
    return res.render("search-result.html", { total: 0 })
  }

  //pegar os dados no banco de dados

  //consultar os dados da tabela
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }

    console.log("aqui estãos seus registros")
    console.log(rows)

    const total = rows.length
    //MOSTRAR A PAGINA HTML COM OS DADOS DO  BANCO DE DADOS 
    return res.render("search-result.html", { places: rows, total: total })
  })




  //__dirname se refere ao diretorio

})


//modelo usado antes do nunjucks
//server.get("/search-result", (req, res) => {
//__dirname se refere ao diretorio
//res.sendFile(__dirname + "/views/search-result.html")
//})
//ligar o sevidor
server.listen(3000)