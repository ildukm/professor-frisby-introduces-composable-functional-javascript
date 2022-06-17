// const nextCharForNumberString = (str) => {
//     const trimmed = str.trim()
//     const number = parseInt(trimmed)
//     const nextNumber = number + 1
//     return String.fromCharCode(nextNumber)
// }

// const nextCharForNumberString = (str) => 
//     String.fromCharCode(
//         parseInt(
//             str.trim()
//         ) + 1
//     )

const Box = x => ({
    map: f => Box(f(x)),
    fold: (f) => f(x),
    inspect: () => `Box(${x})`
})

// #1
// const nextCharForNumberString = (str) =>
//   Box(str)
//     .map(s => s.trim())
//     .map(s => parseInt(s))
//     .map(i => i + 1)
//     .map(i => String.fromCharCode(i))

// const result = nextCharForNumberString(' 64 ')

// console.log(result.inspect())
// console.log(result.fold())

// #2
// const moneyToFloat = str =>
//     parseFloat(str.replace(/\$/g, ''))

// const percentToFloat = str => {
//     const replaced = str.replace(/\%/g, '')
//     const number = parseFloat(replaced)
//     return number * 0.01
// }

const moneyToFloat = str =>
    Box(str)
      .map(s => s.replace(/\$/g, ''))
      .map(i => parseFloat(i))

const percentToFloat = str => 
    Box(str)
      .map(s => s.replace(/\%/g, ''))
      .map(i => parseFloat(i))
      .map(f => f * 0.01)

const applyDiscount = (price, discount) => 
    moneyToFloat(price)
      .map(cost =>
        percentToFloat(discount)
          .map(savings => cost - cost * savings));  

// const applyDiscount = (price, discount) => {
//     const cost = moneyToFloat(price)
//     const savings = percentToFloat(discount)
//     return cost - cost * savings
// }

// console.log(
//     moneyToFloat('$5').inspect(),
//     percentToFloat('20%').inspect()
// )

console.log(
    applyDiscount('$5', '20%')
        .fold(x => x)
        .fold(x => x)
)
