const EventEmitter = require('events');
class MeuEmissor extends EventEmitter {
}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario:click'

// meuEmissor.on(nomeEvento, function (click) {
//   console.log('usuario clicou', click)
// })

// meuEmissor.emit(nomeEvento, 'barra de rolagem')

// let count = 0
// setInterval(function () {
//   meuEmissor.emit(nomeEvento, 'no ok' + (count++))
// }, 1000)

const stdin = process.openStdin()
stdin.addListener('data', function (value) {
  console.log(`voce digitou: ${value.toString().trim()}`)
})


//! abaixo um exempl de events com Promise, não indicado pois a promise é feita 
//! para ser utilizado apenas uma vez, em eventos recorrentes o correto é
//! usar o eventEmitter
// function main() {
//   return new Promise(function (resolve, reject) {
//       stdin.addListener('data', function (value) {
//           // console.log(`Voce digitou: ${value.toString().trim()}`)
//           return resolve(value)
//       })
//   })
// }
// main().then(function (resultado) {
//   console.log('resultado', resultado.toString())
// })