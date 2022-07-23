const names = [
  'Luke Skywalker',
  'Darth Vader',
  'Leia Organa',
  'Owen Lars',
  'Beru Whitesun lars',
  'Biggs Darklighter',
  'Obi-Wan Kenobi',
  'Anakin Skywalker',
  'Wilhuff Tarkin',
  'Chewbacca'
]

//! FOR
// function main() {
//   const sameNames = []
//   let count = 1
//   do {
//     console.time('FOR RUNTIME') // measuring runtime

//     const sameNames = []
//     for (let i = 0; i <= names.length - 1; i++) {
//       sameNames.push(names[i])
//     }
//     console.log('sameNames', sameNames)

//     console.timeEnd('FOR RUNTIME') // measuring runtime
//     count++
//   } while (count <= 5)
// }

// main()

//   //! FOR IN
// function main() {
//   const sameNames = []
//   let count = 1
//   do {
//     console.time('FOR_IN RUNTIME') // measuring runtime
//     // const sameNames = []
//     for (const i in names) {
//       sameNames.push(names[i])
//     }
//     // console.log('sameNames', sameNames)

//     console.timeEnd('FOR_IN RUNTIME') // measuring runtime
//     count++
//   } while (count <= 5)
// }

// main()

//! FOR OF
function main () {
  const sameNames = []
  let count = 1
  do {
    console.time('FOR_OF RUNTIME') // measuring runtime
    for (const name of names) {
      sameNames.push(name)
    }
    // console.log('sameNames', sameNames)
    console.timeEnd('FOR_OF RUNTIME') // measuring runtime
    count++
  } while (count <= 5)
}

main()
