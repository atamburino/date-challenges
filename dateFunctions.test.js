// dateFunctions.test.js

const {
  calculateDaysSince,
  filterRecentDates,
  getMonthNames,
  sortDatesAscending,
  calculateAges,
  groupDatesByYear,
  findFirstMonday,
  checkLeapYears,
  addDaysToDates,
  // getDayOfWeekForDates,
  // findMostRecentDate,
  // getLastDayOfMonth,
  // calculateDuration,
  // listDatesOfWeekdayInMonth,
  // getDateDifferences
} = require("./dateFunctions");

// Mock Date for testing
const RealDate = Date;
global.Date = class extends RealDate {
  constructor(...args) {
    if (args.length) return new RealDate(...args);
    return new RealDate("2023-10-15T00:00:00Z"); // Fixed current date for testing
  }
};

// Test 1
describe("JavaScript Date Coding Challenges", () => {
  test("calculateDaysSince", () => {
    const startDate = "2023-01-01";
    const daysSince = Math.floor(
      (new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    expect(calculateDaysSince([{ startDate }])).toEqual([daysSince]);
    expect(calculateDaysSince([{ startDate: "Invalid Date" }])).toEqual([NaN]);
  });
});
// end of test 1

// Test 2
test("filterRecentDates", () => {
  const datesArray = [
    "2023-09-30", // 15 days before
    "2023-10-01", // 14 days before
    "2023-10-14", // 1 day before
    "2023-09-01", // Outside 30 day scope
    "3000-1-01", // Future!!!!!!!!!!
  ];

  // 30 days from 2023-10-15
  const expectedResult = ["2023-09-30", "2023-10-01", "2023-10-14"];

  const result = filterRecentDates(datesArray);
  expect(result).toEqual(expectedResult);
});
// END OF TEST 2

// Test 3: getMonthNames
describe("getMonthNames Function", () => {
  test("should return correct month names for valid Date objects", () => {
    const datesArray = [
      new Date(3000, 0, 1), // January (months are 0-based in JS)
      new Date(3000, 1, 15), // February
    ];
    const expected = ["January", "February"];
    const result = getMonthNames(datesArray);
    expect(result).toEqual(expected);
  });
});
// END of Test 3

/// Test 4: sortDatesAscending
describe("sortDatesAscending Function", () => {
  test("should sort dates in ascending order", () => {
    const january = new Date(2023, 0, 1); // January 1, 2023
    const june = new Date(2023, 5, 15); // June 15, 2023
    const december = new Date(2023, 11, 25); // December 25, 2023

    // Verify dates were created correctly
    console.log("Test dates:", {
      january: january.toISOString(),
      june: june.toISOString(),
      december: december.toISOString(),
    });

    const datesArray = [december, january, june];

    const result = sortDatesAscending(datesArray);

    // Test length
    expect(result.length).toBe(3);

    // Test order
    expect(result[0].getMonth()).toBe(0); // January
    expect(result[1].getMonth()).toBe(5); // June
    expect(result[2].getMonth()).toBe(11); // December

    // Test years are correct
    result.forEach((date) => {
      expect(date.getFullYear()).toBe(2023);
    });
  });

  test("should throw error for non-array input", () => {
    expect(() => {
      sortDatesAscending("not an array");
    }).toThrow("Input must be an array");
  });
});

// Test 5: calculateAges
describe("calculateAges Function", () => {
  test("should calculate correct ages", () => {
    const birthdates = [
      "2000-05-10", // 23 years old as of 2023-10-15
      "2000-10-20", // 22 years old (birthday hasn't occurred yet)
      "1990-01-01", // 33 years old
    ];
    const expected = [23, 22, 33];
    expect(calculateAges(birthdates)).toEqual(expected);
  });

  test("should handle invalid dates", () => {
    const birthdates = [
      "invalid-date",
      "2000-13-45", // invalid month/day
      "not-a-date",
    ];
    const result = calculateAges(birthdates);
    result.forEach((age) => {
      expect(isNaN(age)).toBe(true);
    });
  });

  test("should throw error for non-array input", () => {
    expect(() => {
      calculateAges("2000-05-10");
    }).toThrow("Input must be an array");
  });

  test("should handle future dates", () => {
    const birthdates = ["2024-01-01"]; // Future date
    expect(calculateAges(birthdates)).toEqual([-1]);
  });
});

// Test 6: groupDatesByYear
describe("groupDatesByYear Function", () => {
  test("should group multiple dates across different years", () => {
    const dates = [
      new Date(2022, 0, 1), // January 1, 2022
      new Date(2022, 11, 31), // December 31, 2022
      new Date(2023, 5, 15), // June 15, 2023
      new Date(2024, 0, 1), // January 1, 2024
    ];

    const result = groupDatesByYear(dates);

    // Test structure
    expect(Object.keys(result)).toEqual(["2022", "2023", "2024"]);

    // Test array lengths
    expect(result["2022"].length).toBe(2);
    expect(result["2023"].length).toBe(1);
    expect(result["2024"].length).toBe(1);

    // Test specific dates
    expect(result["2022"][0].getFullYear()).toBe(2022);
    expect(result["2023"][0].getFullYear()).toBe(2023);
    expect(result["2024"][0].getFullYear()).toBe(2024);
  });

  test("should handle all dates in the same year", () => {
    const dates = [
      new Date(2023, 0, 1), // January 1, 2023
      new Date(2023, 5, 15), // June 15, 2023
      new Date(2023, 11, 31), // December 31, 2023
    ];

    const result = groupDatesByYear(dates);

    // Test structure
    expect(Object.keys(result)).toEqual(["2023"]);

    // Test array length
    expect(result["2023"].length).toBe(3);

    // Test all dates are in 2023
    result["2023"].forEach((date) => {
      expect(date.getFullYear()).toBe(2023);
    });
  });

  test("should throw error for non-array input", () => {
    expect(() => {
      groupDatesByYear("not an array");
    }).toThrow("Input must be an array");
  });
});

// Test 7: findFirstMonday
describe("findFirstMonday Function", () => {
  test("should find first Monday for different months in 2024", () => {
    expect(findFirstMonday(2024, 1).getDate()).toBe(1); // January 1, 2024 is a Monday
    expect(findFirstMonday(2024, 3).getDate()).toBe(4); // March 4, 2024 is first Monday
    expect(findFirstMonday(2024, 4).getDate()).toBe(1); // April 1, 2024 is a Monday
  });

  test("should handle different years correctly", () => {
    expect(findFirstMonday(2023, 10).getDate()).toBe(2); // October 2, 2023 is first Monday
    expect(findFirstMonday(2025, 1).getDate()).toBe(6); // January 6, 2025 is first Monday
  });

  test("should return correct day of week", () => {
    const result = findFirstMonday(2024, 5);
    expect(result.getDay()).toBe(1); // Should always be Monday (1)
  });

  test("should handle invalid inputs", () => {
    // Test invalid month numbers
    expect(() => {
      findFirstMonday(2024, 13);
    }).toThrow("Month must be between 1 and 12");

    expect(() => {
      findFirstMonday(2024, 0);
    }).toThrow("Month must be between 1 and 12");

    // Test non-integer inputs
    expect(() => {
      findFirstMonday("invalid", 1);
    }).toThrow("Year and month must be integers");

    expect(() => {
      findFirstMonday(2024, "invalid");
    }).toThrow("Year and month must be integers");
  });

  test("should handle month numbers correctly", () => {
    const december = findFirstMonday(2024, 12);
    expect(december.getMonth()).toBe(11); // December should be 11 internally
    expect(december.getDate()).toBe(2); // First Monday of December 2024
  });
});

test("should handle month numbers correctly", () => {
  const december = findFirstMonday(2024, 12);
  expect(december.getMonth()).toBe(11); // December should be 11 internally
  expect(december.getDate()).toBe(2); // First Monday of December 2024
});

// Test 8: checkLeapYears
describe("checkLeapYears Function", () => {
  test("should correctly identify leap years", () => {
    const years = [2000, 2020, 2024, 2025];
    const expected = [true, true, true, false];
    expect(checkLeapYears(years)).toEqual(expected);
  });

  test("should handle century years correctly", () => {
    const years = [1900, 2000, 2100, 2400];
    const expected = [false, true, false, true];

    // 1900 is not a leap year (divisible by 100 but not 400)
    // 2000 is a leap year (divisible by 400)
    // 2100 is not a leap year (divisible by 100 but not 400)
    // 2400 is a leap year (divisible by 400)

    expect(checkLeapYears(years)).toEqual(expected);
  });

  test("should throw error for non-array input", () => {
    expect(() => {
      checkLeapYears(2024);
    }).toThrow("Input must be an array");
  });

  test("should throw error for non-integer years", () => {
    expect(() => {
      checkLeapYears([2024, "2025", 2026]);
    }).toThrow("All array elements must be valid integers");
  });

  test("should handle empty array", () => {
    expect(checkLeapYears([])).toEqual([]);
  });

  test("should handle negative years", () => {
    const years = [-4, -100, -400];
    const expected = [true, false, true];
    expect(checkLeapYears(years)).toEqual(expected);
  });
});

// Test 9: addDaysToDates
describe("addDaysToDates Function", () => {
  test("should throw error for non-array input", () => {
    expect(() => {
      addDaysToDates(new Date(), 5);
    }).toThrow("First argument must be an array");
  });

  test("should throw error for non-integer days", () => {
    const date = new Date(2024, 0, 1);
    const dates = [date];
    expect(() => {
      addDaysToDates(dates, "5");
    }).toThrow("Second argument must be an integer");
  });

  test("should throw error for invalid dates in array", () => {
    const validDate = new Date(2024, 0, 1);
    expect(() => {
      addDaysToDates([validDate, "invalid", validDate], 5);
    }).toThrow("All array elements must be valid Date objects");
  });
});

// After all tests, restore the original Date object to avoid side effects in other tests.
afterAll(() => {
  global.Date = RealDate; // Restore Date after test
});
