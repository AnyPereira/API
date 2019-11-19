const Alunas = require('../model/alunas');

const fs = require('fs');

exports.get = (req, res) => {
    Alunas.find(function (err, alunas) {  
      if (err) res.status(500).send(err);
      res.status(200).send(alunas);
})
}

exports.getById = (req, res) => {
  const alunasId = req.params.id

  Alunas.findById(alunasId, function(err, alunas){
    if (err) return res.status(500).send(err);

    if(!alunas){
      return res.status(200).send({message: `Infelizmemte não localizamos a aluna de id: ${alunasId}`});

    }
    res.status(200).send(alunasId);
  })
//   if (id > 34 || id <= 0) {
//     res.redirect(301, "https://en.wikipedia.org/wiki/Man-in-the-middle_attack")
//   }
//   res.status(200).send(alunas.find(aluna => aluna.id == id))
}

  exports.getBooks = (req, res) => {
    const id = req.params.id

    Alunas.findById(id, function(err, alunas){
      if (err)
        return res.status(500).send(err)
      if(!alunas){
        return res.status(200).send({menssage: `Infelizmente não localizamos a aluna de id: ${id}`});
      }
      const livrosAluna = alunas.livros
      const livrosLidos = livrosAluna.filter(livro => livro.leu == "true")
      const titulosLivros = livrosLidos.map(livro => livro.titulo)
      res.send(titulosLivros)
    })

  // const aluna = alunas.find(aluna => aluna.id == id)
  // if (!aluna) {
  //   res.send("Nao encontrei essa garota")
  // }
  // const livrosAluna = aluna.livros
  // const livrosLidos = livrosAluna.filter(livro => livro.leu == "true")
  // const tituloLivros = livrosLidos.map(livro => livro.titulo)
  // res.send(tituloLivros)
}

exports.getSp = (req, res) => {

  Alunas.find(function (err, alunas) {
    if (err) res.status(500).send(err)

    const nasceuSp = alunas.filter(aluna => aluna.nasceuEmSp === "true");
    const meninasSp = nasceuSp.map(aluna => aluna.nome)

    res.status(200).send(meninasSp)
  })
}

exports.getAge = (req, res) => {
  const id = req.params.id

  Alunas.findById(req.params.id, function(err, alunas){
    if (err) return res.status(500).send(err)
    if (!alunas){
      return res.status(200).send({menssage: `Infelizmente não localizamos a aluna de id: ${req.params.id}`});
  }  
  const dataNasc = alunas.dateOfBirth
  const arrData = dataNasc.split("/")
  const dia = arrData[0]
  const mes = arrData[1]
  const ano = arrData[2]
  const idade = calcularIdade(ano, mes, dia)
  res.status(200).send({ idade })
  })
  // const aluna = alunas.find(item => item.id == id)
  // const dataNasc = aluna.dateOfBirth
  // const arrData = dataNasc.split("/")
  // const dia = arrData[0]
  // const mes = arrData[1]
  // const ano = arrData[2]
  // const idade = calcularIdade(ano, mes, dia)
  // res.status(200).send({ idade })
}

function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
  const now = new Date()
  const anoAtual = now.getFullYear()
  const mesAtual = now.getMonth() + 1
  const hoje = now.getDate()

  let idade = anoAtual - anoDeNasc

  if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
    idade -= 1
  }
  return idade
}

exports.post = (req, res) => { 
  let aluna = new Alunas(req.body);

  aluna.save(function(err){
    if(err) res.status(500).send(err);

    res.status(201).send(aluna);
  })
  // const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
  // alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros });

  // fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
  //   if (err) {
  //     return res.status(500).send({ message: err });
  //   }
  //   console.log("The file was saved!");
  // }); 

  // return res.status(201).send(alunas);
}

exports.postBooks = (req, res) => {
  const id = req.params.id

  Alunas.findById(id, function(err, alunas){
    if (err) return res.status(500).send(err)
    if (!alunas){
      return res.status(200).send({menssage: `Infelizmente não localizamos a aluna de id: ${req.params.id}`});
  }  

 const livro = req.body;
  (alunas.livros).push(livro);

  alunas.save(function(err){
    if(err) res.status(500).send(err);

    res.status(201).send(alunas);
  })
  // const id = req.params.id
  // const aluna = alunas.find(aluna => aluna.id == id)
  // if (!aluna) {
  //   res.send("Nao encontrei essa garota")
  // }
  // const { titulo, leu } = req.body;
  // alunas[aluna.id - 1].livros.push({ titulo, leu });
  
  // fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
  //   if (err) {
  //       return res.status(500).send({ message: err });
  //   }
  //   console.log("The file was saved!");
  });

  // res.status(201).send(alunas[aluna.id - 1].livros);
}