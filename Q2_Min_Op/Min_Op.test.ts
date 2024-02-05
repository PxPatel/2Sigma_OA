import { expect, test } from "@jest/globals";
import { getMinOperations } from "./Min_Op";


/**
 * run command to run tests: "npm run test"
 */

const testCases = [
  { num: parseInt("111", 2), output: 2 },
  { num: parseInt("10101", 2), output: 3 },
  { num: parseInt("11011", 2), output: 3 },
  { num: parseInt("101", 2), output: 2 },
  { num: parseInt("1101110111", 2), output: 4 },
  { num: parseInt("1101101010101101010011010", 2), output: 12 },
  { num: parseInt("1101101010101100010011010", 2), output: 11 },
  { num: parseInt("11010111010101111011010", 2), output: 9 },
  { num: parseInt("11110000", 2), output: 2 },
  { num: parseInt("10000001", 2), output: 2 },
  { num: parseInt("10010001", 2), output: 3 },
  { num: parseInt("10011001", 2), output: 4 },
  { num: parseInt("11011001", 2), output: 4 },
  { num: parseInt("10111001", 2), output: 4 },
  { num: parseInt("11111001", 2), output: 3 },
  { num: parseInt("1000011101110100111010", 2), output: 8 },
  { num: parseInt("1000001000010101111", 2), output: 6 },
];

testCases.forEach((testCase, index) => {
  test(testCase.num + " Test", () => {
    expect(getMinOperations(testCase.num)).toBe(testCase.output);
  });
});