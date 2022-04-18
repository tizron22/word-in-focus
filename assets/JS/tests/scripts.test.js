const addDifficultyListener = require('../scripts.js');

describe("Diffculty Selection", () =>{
    describe("Default Setting", () =>{
        test("Should show the difficulty as medium", () =>{
            expect(addDifficultyListener()).toBe('medium');
        });
    });
});