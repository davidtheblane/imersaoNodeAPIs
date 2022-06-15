// //ver os container que estão rodando
// docker ps

// //conectar ao container do mongodb
// docker exec -it 46362beebf3a mongo -u davi -p minhasenhasecreta --authenticationDatabase herois

//mostra todos os bancos
show dbs

//escolhe a database
use herois

//visualiza as tabelas(collections)
show collections

//comandos mongodb

db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento: '1998/01/01'
})

db.herois.find()
db.herois.find().pretty()

for (let i = 0; i <= 1000; i++) {
  db.herois.insert({
    nome: `Clone-${i}`,
    poder: 'Velocidade',
    dataNascimento: '1998/01/01'
  })
}
db.herois.count()
db.herois.findOne()
db.herois.find().limit(500).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })

//criando crud
//create
db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento: '1998/01/01'
})

//read
db.herois.find()
//update
db.herois.update({ _id: ObjectId("629f73915e4573a7764eb58b") },
  { nome: 'Mulher Maravilha' })

db.herois.update({ _id: ObjectId("629f76615e4573a7764eb967") },
  { $set: { nome: 'Lanterna Verde' } })

//delete
db.herois.remove({})