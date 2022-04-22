/**
 * @jest-environment jsdom
 */
const createEmptyArrays = require('../scripts');

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});


describe("Create Array for User Answers", () =>{
    test("Create one array within an array with 6 blank items (Hard Difficulty)", () =>{
        expect(createEmptyArrays(6, 1)).toEqual([['', '', '', '', '', ''],]);
    });
    test("Create two arrays within an array with 5 blank items (Medium Difficulty)", () =>{
        expect(createEmptyArrays(5, 2)).toEqual([['', '', '', '', ''],['', '', '', '', ''],]);
    });
    test("Create three arrays within an array with 4 blank items (Easy Difficulty)", () =>{
        expect(createEmptyArrays(4, 3)).toEqual([['', '', '', ''],['', '', '', ''],['', '', '', ''],]);
    });
});