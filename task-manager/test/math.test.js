const path = require('path');
require('dotenv').config({path: path.resolve(__dirname,'../config/test.env')});
const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})  

// test('calculate total with tip', () => {
//     const total = calculateTip(10, .3);
//     expect(total).toBe(13);
// })

// test('Should convert 32 F to 0 C', () => {
//     const temperature = fahrenheitToCelsius(32);
//     expect(temperature).toBe(0);
// })

// test('Should convert 0 C to 32 F', () => {
//     const temperature = celsiusToFahrenheit(0);
//     expect(temperature).toBe(32);
// })

// // test('async test code', (done) => {
// //     setTimeout(() => {
// //         expect(2).toBe(1);
// //         done();
// //     }, 2000)
// // })

// test('add 2 num',  (done) => {
//     add(2, 3).then((sum) => {
//         expect(sum).toBe(5);
//         done();
//     })
// })

// test('add 2 num using async await', async () => {
//     const sum = await add(22, 1);
//     expect(sum).toBe(23);
// })