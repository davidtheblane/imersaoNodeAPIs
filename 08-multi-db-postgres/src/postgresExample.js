//npm install sequelize pg pg-hstore

const Sequelize = require('sequelize')
const driver = new Sequelize(
  'heroes',
  'davi',
  'minhasenhasecreta',
  {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
    operatorsAliases: 0,
    omitNull: false
  }
)
//parei em 09:>23 erro ao tentar sincronizar no banco
async function main() {
  const Herois = driver.define('herois', {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING,
      required: true
    },
    poder: {
      type: Sequelize.STRING,
      required: true
    }
  }, {
    tableName: 'TB_HEROIS',
    freezeTableName: false,
    timestamp: false
  })

  await Herois.sync()
  // await Herois.create({
  //   nome: 'Batman',
  //   poder: 'Dinheiro'
  // })

  const result = await Herois.findAll({ raw: true })
  console.log('result', result)
}

main()