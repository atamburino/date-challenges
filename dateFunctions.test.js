// dateFunctions.test.js

const {
    calculateDaysSince,
    filterRecentDates,
    getMonthNames,
    // sortDatesAscending,
    // calculateAges,
    // groupDatesByYear,
    // findFirstMonday,
    // checkLeapYears,
    // addDaysToDates,
    // getDayOfWeekForDates,
    // findMostRecentDate,
    // getLastDayOfMonth,
    // calculateDuration,
    // listDatesOfWeekdayInMonth,
    // getDateDifferences
} = require('./dateFunctions');

// Mock Date for testing
const RealDate = Date;
global.Date = class extends RealDate {
    constructor(...args) {
        if (args.length) return new RealDate(...args);
        return new RealDate('2023-10-15T00:00:00Z'); // Fixed current date for testing
    }
};

// Test 1
describe('JavaScript Date Coding Challenges', () => {
    test('calculateDaysSince', () => {
        const startDate = "2023-01-01";
        const daysSince = Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));
        expect(calculateDaysSince([{ startDate }])).toEqual([daysSince]);
        expect(calculateDaysSince([{ startDate: "Invalid Date" }])).toEqual([NaN]);
    });
});
// end of test 1


// Test 2
test('filterRecentDates', () => {
    const datesArray = [
        "2023-09-30", // 15 days before
        "2023-10-01", // 14 days before
        "2023-10-14", // 1 day before
        "2023-09-01", // Outside 30 day scope
        "3000-1-01"  // Future!!!!!!!!!!
    ];

    // 30 days from 2023-10-15
    const expectedResult = [
        "2023-09-30",
        "2023-10-01",
        "2023-10-14"
    ];

    const result = filterRecentDates(datesArray);
    expect(result).toEqual(expectedResult);
});
// END OF TEST 2


// After all tests, restore the original Date object to avoid side effects in other tests.
afterAll(() => {
    global.Date = RealDate; // Restore Date after test
});
