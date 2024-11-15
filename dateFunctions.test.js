// dateFunctions.test.js

const {
    calculateDaysSince,
    filterRecentDates,
    getMonthNames,
    sortDatesAscending,
    calculateAges,
    groupDatesByYear,
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

// Test 3: getMonthNames
describe('getMonthNames Function', () => {
    test('should return correct month names for valid Date objects', () => {
        const datesArray = [
            new Date(3000, 0, 1),  // January (months are 0-based in JS)
            new Date(3000, 1, 15)  // February
        ];
        const expected = ['January', 'February'];
        const result = getMonthNames(datesArray);
        expect(result).toEqual(expected);
    });
});
// END of Test 3


/// Test 4: sortDatesAscending
describe('sortDatesAscending Function', () => {
    test('should sort dates in ascending order', () => {
        const january = new Date(2023, 0, 1);    // January 1, 2023
        const june = new Date(2023, 5, 15);      // June 15, 2023
        const december = new Date(2023, 11, 25);  // December 25, 2023
        
        // Verify dates were created correctly
        console.log('Test dates:', {
            january: january.toISOString(),
            june: june.toISOString(),
            december: december.toISOString()
        });
        
        const datesArray = [december, january, june];
        
        const result = sortDatesAscending(datesArray);
        
        // Test length
        expect(result.length).toBe(3);
        
        // Test order
        expect(result[0].getMonth()).toBe(0);  // January
        expect(result[1].getMonth()).toBe(5);  // June
        expect(result[2].getMonth()).toBe(11); // December
        
        // Test years are correct
        result.forEach(date => {
            expect(date.getFullYear()).toBe(2023);
        });
    });

    test('should throw error for non-array input', () => {
        expect(() => {
            sortDatesAscending("not an array");
        }).toThrow('Input must be an array');
    });
});


// Test 5: calculateAges
describe('calculateAges Function', () => {
    test('should calculate correct ages', () => {
        const birthdates = [
            "2000-05-10",  // 23 years old as of 2023-10-15
            "2000-10-20",  // 22 years old (birthday hasn't occurred yet)
            "1990-01-01",  // 33 years old
        ];
        const expected = [23, 22, 33];
        expect(calculateAges(birthdates)).toEqual(expected);
    });

    test('should handle invalid dates', () => {
        const birthdates = [
            "invalid-date",
            "2000-13-45",  // invalid month/day
            "not-a-date"
        ];
        const result = calculateAges(birthdates);
        result.forEach(age => {
            expect(isNaN(age)).toBe(true);
        });
    });

    test('should throw error for non-array input', () => {
        expect(() => {
            calculateAges("2000-05-10");
        }).toThrow('Input must be an array');
    });

    test('should handle future dates', () => {
        const birthdates = ["2024-01-01"];  // Future date
        expect(calculateAges(birthdates)).toEqual([-1]);
    });
});


// Test 6: groupDatesByYear
describe('groupDatesByYear Function', () => {
    test('should group multiple dates across different years', () => {
        const dates = [
            new Date(2022, 0, 1),    // January 1, 2022
            new Date(2022, 11, 31),  // December 31, 2022
            new Date(2023, 5, 15),   // June 15, 2023
            new Date(2024, 0, 1)     // January 1, 2024
        ];
        
        const result = groupDatesByYear(dates);
        
        // Test structure
        expect(Object.keys(result)).toEqual(['2022', '2023', '2024']);
        
        // Test array lengths
        expect(result['2022'].length).toBe(2);
        expect(result['2023'].length).toBe(1);
        expect(result['2024'].length).toBe(1);
        
        // Test specific dates
        expect(result['2022'][0].getFullYear()).toBe(2022);
        expect(result['2023'][0].getFullYear()).toBe(2023);
        expect(result['2024'][0].getFullYear()).toBe(2024);
    });

    test('should handle all dates in the same year', () => {
        const dates = [
            new Date(2023, 0, 1),   // January 1, 2023
            new Date(2023, 5, 15),  // June 15, 2023
            new Date(2023, 11, 31)  // December 31, 2023
        ];
        
        const result = groupDatesByYear(dates);
        
        // Test structure
        expect(Object.keys(result)).toEqual(['2023']);
        
        // Test array length
        expect(result['2023'].length).toBe(3);
        
        // Test all dates are in 2023
        result['2023'].forEach(date => {
            expect(date.getFullYear()).toBe(2023);
        });
    });

    test('should throw error for non-array input', () => {
        expect(() => {
            groupDatesByYear("not an array");
        }).toThrow('Input must be an array');
    });
});

// After all tests, restore the original Date object to avoid side effects in other tests.
afterAll(() => {
    global.Date = RealDate; // Restore Date after test
});
