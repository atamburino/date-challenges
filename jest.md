# Introduction to Jest Test Writing

`Jest` is a testing framework developed by Facebook, widely used for JavaScript and React applications. Jest is preferred because it’s simple, has an extensive API for creating various test types, and provides built-in support for assertions, mocks, and asynchronous testing.

## Key Concepts:

1. Assertions: Statements that verify a condition (e.g., checking if two values are equal).
2. Test Suites: Groups of related tests, typically organized in a single file or describe block.
3. Test Cases: Individual tests within a suite, verifying specific functionality.
4. Edge Cases: Test cases that cover unusual or extreme inputs to ensure the function behaves correctly.


## Setting Up Jest
If Jest isn’t already installed, you can install it in your project with:

```bash
npm install --save-dev jest
```


To run tests with Jest, add the following to your package.json:

```json
"scripts": {
  "test": "jest"
}
```

Then run your tests with:

```bash
npm test
```

## Jest Syntax Breakdown
Basic Structure of a Jest Test
Here’s a typical structure of a test in Jest:

```javascript
test('description of what the test does', () => {
    // Setup: define variables, set conditions
    const result = someFunction(input);

    // Assertion: check the result is as expected
    expect(result).toBe(expectedOutput);
});
```
- `test`: Defines a test case. The first argument is a string describing the test, and the second argument is a function containing the test’s logic.
- `expect`: An assertion function used to compare the result with the expected value.
- `toBe`: A matcher that checks if the result is strictly equal to the expected value.


## Example Test with Jest Syntax
Here’s a sample function and a test:

```javascript
// Function to be tested
function add(a, b) {
    return a + b;
}

// Jest test case
test('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).toBe(5);
});
```

## Organizing Tests with describe
`describe` keyword blocks group related tests, making the test output easier to read. Here’s how you might organize tests for a function:

```javascript
describe('add function', () => {
    test('adds 2 + 3 to equal 5', () => {
        expect(add(2, 3)).toBe(5);
    });

    test('adds -2 + 2 to equal 0', () => {
        expect(add(-2, 2)).toBe(0);
    });
});
```

## Common Jest Matchers
Jest provides many matchers for different types of comparisons. Here are some commonly used ones:

| Matcher           | Description                                                   |
|-------------------|---------------------------------------------------------------|
| **`.toBe`**       | For strict equality (like `===`).                             |
| **`.toEqual`**    | For deep equality, useful for comparing objects and arrays.   |
| **`.toBeNull`**   | Checks if the value is `null`.                                |
| **`.toBeUndefined`** / **`.toBeDefined`** | Checks if a value is `undefined` or defined. |
| **`.toBeTruthy`** / **`.toBeFalsy`** | Checks if a value is truthy or falsy.          |
| **`.toContain`**  | Checks if an array or string contains a specific item.        |
| **`.toThrow`**    | Checks if a function throws an error.                         |

## Writing Tests for Edge Cases
`Edge cases` are inputs that are unusual or extreme. Testing edge cases ensures your function can handle unexpected or extreme scenarios. Here are common types of edge cases:

- Empty Inputs: Test with no input or an empty array/object.
- Boundary Values: Test at the edges of acceptable input (e.g., 0 or 1 in an integer function).
- Null/Undefined Values: Test how your function handles null and undefined.
- Unexpected Types: Test with unexpected data types (e.g., passing a string instead of a number).


## Example: Edge Case Tests for add Function

```javascript
describe('add function edge cases', () => {
    test('adds 0 + 0 to equal 0', () => {
        expect(add(0, 0)).toBe(0);
    });

    test('adds null + 5 to return NaN', () => {
        expect(add(null, 5)).toBeNaN();
    });

    test('adds undefined + 5 to return NaN', () => {
        expect(add(undefined, 5)).toBeNaN();
    });

    test('adds "5" + 5 to return NaN when input is a string', () => {
        expect(add("5", 5)).toBeNaN();
    });
});
```

In this example:

- Testing 0 + 0 checks boundary behavior.
- Passing null, undefined, or a string tests how well the function handles unexpected inputs.

## Best Practices for Writing Jest Tests

1. Isolate Tests: Each test should verify only one piece of functionality. This makes it easier to locate the source of failures.
2. Name Tests Clearly: Describe what the test does so that anyone reading it understands its purpose.
3. Use describe Blocks: Group related tests in describe blocks for clarity.
4. Include Edge Cases: Test common, edge, and unexpected cases to ensure robustness.
5. Avoid Hardcoding Results: Instead of hardcoding, dynamically calculate expected values in complex cases.
6. Test Error Handling: Use .toThrow to verify error messages or behavior.

## Real-World Example with Jest
Let’s walk through a simpler example of testing a function with Jest. This function will calculate the square of a number. We'll write a few tests to verify its behavior and cover some edge cases.

## Example Function: `squareNumber`
Function Definition: This function takes a number as input and returns its square. If the input is not a valid number, it should return "Invalid Input".

```javascript
// squareNumber.js
export function squareNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) return 'Invalid Input';
    return num * num;
}
```

## Test Suite
We’ll now create a test suite using Jest to ensure our function, `squareNumber`, works correctly across various cases, including typical inputs and edge cases.

```javascript
// squareNumber.test.js
import { squareNumber } from './squareNumber';

describe('squareNumber', () => {
    test('squares a positive number correctly', () => {
        expect(squareNumber(4)).toBe(16); // 4 squared is 16
    });

    test('squares a negative number correctly', () => {
        expect(squareNumber(-3)).toBe(9); // -3 squared is 9
    });

    test('squares zero correctly', () => {
        expect(squareNumber(0)).toBe(0); // 0 squared is 0
    });

    test('returns "Invalid Input" for non-number inputs', () => {
        expect(squareNumber('a')).toBe('Invalid Input'); // string input
        expect(squareNumber(null)).toBe('Invalid Input'); // null input
        expect(squareNumber(undefined)).toBe('Invalid Input'); // undefined input
        expect(squareNumber({})).toBe('Invalid Input'); // object input
    });

    test('returns "Invalid Input" for NaN', () => {
        expect(squareNumber(NaN)).toBe('Invalid Input'); // NaN input
    });
});
```

## Explanation of Tests

1. Positive Number Test: Verifies that the function correctly squares a positive number.
2. Negative Number Test: Ensures that the function handles negative numbers correctly (as the square of a negative number is positive).
3. Zero Test: Checks that squaring zero returns zero, a common boundary value in numeric functions.
4. Non-Number Input Test: Ensures that any non-number input (like a string, null, undefined, or an object) returns "Invalid Input".
5. NaN Test: Checks that passing NaN (a "not-a-number" value) as input also results in "Invalid Input".

### Why These Tests Are Important
By covering a variety of input types, we ensure that squareNumber can handle typical inputs, edge cases (like zero and negative numbers), and invalid types gracefully. Writing tests like these in Jest not only validates your function's behavior but also makes your code more robust by anticipating unusual inputs.

## Running Your Tests
To run tests, use:

```bash
npm test
```

## How does Jest know where to find my tests? (Junior+)
In Jest, tests are automatically discovered and run based on specific file naming conventions. This makes it easy to organize and run tests consistently across your codebase. Here’s an expanded explanation of Jest’s file naming conventions, recommended folder structures, and how Jest identifies and executes test files.

### File Naming Conventions
Jest will automatically look for files that follow certain naming patterns:

- Files that end with .test.js or .test.jsx, such as squareNumber.test.js.
- Files that end with .spec.js or .spec.jsx, such as squareNumber.spec.js.

These naming conventions make it clear that a file contains tests and allow Jest to identify test files automatically. You can use either .test.js or .spec.js based on your team’s or project’s conventions. 

### Both formats are widely recognized in the industry:

.test.js: Often used for individual unit tests.
.spec.js: Sometimes preferred for behavior-driven development (BDD) or when focusing on component specifications.

### Folder Structure for Test Files
Organizing tests within your project’s file structure helps keep tests closely related to the code they verify. Below are two common file structure patterns:

1. Inline with Source Files **(Recommended)**
In this structure, test files are placed alongside the code files they test. This is often the recommended approach for smaller projects, as it makes it easier to find tests for specific functions or components.

```less
project-root/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Header.test.js    // Test file for Header.js
│   ├── utils/
│   │   ├── calculate.js
│   │   └── calculate.test.js // Test file for calculate.js
```

2. Separate __tests__ Directory
In this structure, a dedicated __tests__ folder houses all test files. This is a good choice for larger projects, especially when tests are complex or if you prefer to keep test files separate from the source code.

```less
project-root/
├── src/
│   ├── components/
│   │   └── Header.js
│   ├── utils/
│   │   └── calculate.js
├── __tests__/
│   ├── components/
│   │   └── Header.test.js   // Test file for Header.js
│   └── utils/
│       └── calculate.test.js // Test file for calculate.js
```

Tip: Jest recognizes folders named __tests__ as a place to search for test files, making this pattern particularly useful in larger codebases.

### How Jest Finds and Runs Test Files
When you run Jest (usually by executing npm test or jest from the command line):

1. Automatic Discovery: Jest will search through your project’s directory tree for files matching the .test.js, .test.jsx, .spec.js, or .spec.jsx patterns.
2. Executing Test Suites: Once Jest locates the test files, it organizes them into test suites and executes each test in sequence.
3. Test Results and Feedback: After running all tests, Jest displays results in the console, providing feedback on each test case. Passed tests are marked in green, and failed tests show errors and stack traces to help with debugging.

### Customizing Jest’s Search with Configuration (When Needed)
You can customize Jest’s file discovery through the Jest configuration file (jest.config.js). For example, to specify custom patterns, use the testMatch option:

```javascript
// jest.config.js
module.exports = {
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",  // Includes all files in __tests__ folders
        "**/?(*.)+(spec|test).[jt]s?(x)" // Matches files with .spec.js or .test.js
    ]
};
```

This configuration helps tailor Jest’s behavior if you have specific folder structures or file naming conventions in mind.

## Key Points to Remember

1. Organize Tests with describe Blocks: Group related tests to improve readability.
2. Write Clear and Isolated Tests: Each test should verify only one piece of functionality, making it easier to debug and understand.
3. Use a Variety of Matchers: Jest offers matchers like .toBe, .toEqual, .toContain, and .toThrow to test various aspects of your code effectively.
4. Test for Edge Cases: Always consider unusual, extreme, or invalid inputs. Testing edge cases makes your code more robust.
5. Follow Best Practices: Clearly name each test, avoid unnecessary hardcoding, and test both typical and edge scenarios.

This comprehensive approach to testing in Jest will help you ensure your code is reliable, maintainable, and capable of handling unexpected inputs.

## Additional Resources
Jest Documentation: Jest Official Documentation – provides in-depth information on all Jest features.
Jest Matchers: Jest Expect API – comprehensive guide to Jest’s assertion methods.
Writing Effective Tests: Blogs, tutorials, and best practices on structuring, naming, and organizing test suites.
