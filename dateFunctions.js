// dateFunctions.js

// Challenge 1: Calculate Days Since
// Given an array of objects with `startDate` properties as strings (e.g., "2023-01-01"),
// map through each array index and calculate the number of days since each date. Use `Date` objects, subtraction for
// date difference, and `Math.floor` to round to whole days.
function calculateDaysSince(datesArray) {

        //SUDO CODE
        // Map through each date in the array
        // For each date string in the array:
            // - Convert the date string to a Date object (using `new Date()`).
            // - Get the current date as a Date object.
            // - Subtract the start date from the current date to get the difference in milliseconds.
            // - Convert milliseconds to days by dividing by (1000 * 60 * 60 * 24).
            // - Use `Math.floor` to round down to the nearest whole number of days.
        // - Return an array with the calculated days since each start date.

        return datesArray.map(dateObject => {
            const startDate = new Date(dateObject.startDate);
            const currentDate = new Date();
            const timeDifference = currentDate - startDate; // This is in milliseconds
            const daysSince = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return daysSince;
        });
}

// Challenge 2: Filter Recent Dates
// Given an array of date strings, return only the dates within the past 30 days.
// Use `Date` object and the `filter` array method to find dates between 30 days ago and today.
function filterRecentDates(datesArray) {
    
    const todaysDate = new Date();
    const thirtyDaysAgo = new Date(todaysDate.getTime() - (30 * 24 * 60 * 60 * 1000));

    // Filter
    const filteredArray = datesArray.filter(dateString => {
        const date = new Date(dateString);
        return date >= thirtyDaysAgo && date <= todaysDate;
    });
    return filteredArray;
}


// Challenge 3: Get Month Names
// Given an array of `Date` objects, return an array of month names for each date.
// Use `getMonth` method to get the month index and map it to a month name array.
function getMonthNames(datesArray) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newArray = [];

    for (let i = 0; i < datesArray.length; i++) {
        let d = datesArray[i];

        // Check if d is a valid Date object
        if (Object.prototype.toString.call(d) !== '[object Date]' || isNaN(d.getTime())) {
            newArray.push("Invalid Date");
        } else {
            let nameOfMonth = monthNames[d.getMonth()];
            newArray.push(nameOfMonth);
        }
    }

    return newArray;
}
// getMonthNames(datesArray);

// Challenge 4: Sort Dates in Ascending Order
// Given an array of `Date` objects, return a new array sorted in ascending order.
// Use `sort` method to arrange dates by time.
function sortDatesAscending(datesArray) {
    // Check if the input is an array
    if (!Array.isArray(datesArray)) {
        throw new Error('Input must be an array');
    }
    
    // Filter out invalid dates by checking for getTime method
    const validDates = datesArray.filter(date => 
        date && typeof date.getTime === 'function' && !isNaN(date.getTime())
    );
    
    // Sort the valid dates
    return validDates.sort((a, b) => a.getTime() - b.getTime());
}


// Challenge 5: Calculate Age
// Given an array of birthdates as strings (e.g., "2000-05-10"), return an array of ages.
// Use `getFullYear` and `getMonth` to compare current date with birthdate, accounting for past birthdays.
// Challenge 5: Calculate Age
function calculateAges(bdayArray) {
    if (!Array.isArray(bdayArray)) {
        throw new Error('Input must be an array');
    }

    return bdayArray.map(dateStr => {  // Changed parameter name to dateStr
        const birthDate = new Date(dateStr);
        
        // Check for invalid dates
        if (isNaN(birthDate.getTime())) {
            return NaN;
        }

        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // If birthday hasn't occurred this year, subtract 1 from age
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    });
}


// Challenge 6: Group Dates by Year
// Given an array of `Date` objects, return an object where each year is a key, and the value is an array of dates from that year.
// Use `reduce` to build an object with years as keys and `push` to add dates to the corresponding arrays.
function groupDatesByYear(dateCollection) {
    if (!Array.isArray(dateCollection)) {
        throw new Error('Input must be an array');
    }

    const yearToDateMapping = {};
    
    // Sort dates first to ensure consistent ordering
    const sortedDates = [...dateCollection].sort((a, b) => a.getTime() - b.getTime());
    
    for (const date of sortedDates) {
        const year = date.getFullYear().toString();
        if (!yearToDateMapping[year]) {
            yearToDateMapping[year] = [];
        }
        yearToDateMapping[year].push(date);
    }
    
    return yearToDateMapping;
}

// Challenge 7: Find First Monday of Month
// Given a year and a month, find the date of the first Monday of that month.
// Use a `while` loop and `getDay` to increment the date until it reaches Monday (1).


// Challenge 8: Check Leap Year
// Given an array of years, return an array of booleans indicating if each year is a leap year.
// Use modulus to check divisibility rules for leap years.


// Challenge 9: Add Days to Dates
// Given an array of `Date` objects and a number of days, return a new array with each date incremented by the given number of days.
// Use `setDate` to add days to each date.


// Challenge 10: Get Day of Week for Dates
// Given an array of `Date` objects, return an array of the day of the week for each date.
// Use `getDay` and map each day index to a day name array.
function getDayOfWeekForDates(datesArray) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   
}

// Challenge 11: Find Most Recent Date
// Given an array of `Date` objects, return the most recent date.
// Use `Math.max` to find the largest date in milliseconds, then convert back to a `Date`.


// Challenge 12: Get Last Day of Month
// Given a year and month, return the last day of the month.
// Use `new Date(year, month + 1, 0)` to get the last day of the previous month.


// Challenge 13: Calculate Duration Between Two Dates
// Given two dates, return the duration between them in days, hours, and minutes.
// Use subtraction and division to calculate differences in days, hours, and minutes.


// Challenge 14: List Dates of Specific Weekday in a Month
// Given a year, a month, and a weekday, return an array of all dates that fall on that weekday in that month.
// Use a loop with `getDay` to check each date until the end of the month.


// Challenge 15: Get Date Differences for Object Properties
// Given an object with properties containing date strings, return a new object with the difference in days for each date property relative to today.
// Use `Object.entries`, `map`, and `Math.floor` to calculate days for each date.


module.exports = {
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
}


  
 
  
  
  







