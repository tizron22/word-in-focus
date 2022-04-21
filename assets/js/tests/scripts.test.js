/**
 * @jest-environment jsdom
 */

const {document, inputLetter} = require('../scripts');

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});


// describe("User Letter Input", () =>{
//     test("Should show letter R in tile when pressed", () =>{
//         expect(inputLetter('R')).toBe('R');
//     });
// });