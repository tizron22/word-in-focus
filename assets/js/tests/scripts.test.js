/**
 * @jest-environment jsdom
 */
require('whatwg-fetch');
let createEmptyArrays;

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();

    createEmptyArrays = require('../scripts');
});


describe("Create Array for User Answers", () =>{
    test("Create one array within an array with six blank items (Hard Difficulty)", () =>{
        expect(createEmptyArrays(6, 1)).toEqual([['', '', '', '', '', ''],]);
    });
    test("Create two arrays within an array with five blank items (Medium Difficulty)", () =>{
        expect(createEmptyArrays(5, 2)).toEqual([['', '', '', '', ''],['', '', '', '', ''],]);
    });
    test("Create three arrays within an array with four blank items (Easy Difficulty)", () =>{
        expect(createEmptyArrays(4, 3)).toEqual([['', '', '', ''],['', '', '', ''],['', '', '', ''],]);
    });
    test("Create ten arrays within an array with ten blank items (For Scalability)", () =>{
        expect(createEmptyArrays(10, 10)).toEqual([['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', ''],
                                                    ['', '', '', '', '', '', '', '', '', '']]);
    });
});