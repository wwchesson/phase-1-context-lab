/* Your Code Here */
let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

let createEmployeeRecords = function (employeeRecords) {
  return employeeRecords.map(function (row) {
    return createEmployeeRecord(row);
  });
};

let createTimeInEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

let createTimeOutEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

let hoursWorkedOnDate = function (targetDate) {
  let startEvent = this.timeInEvents.find(function (e) {
    return e.date === targetDate;
  });

  let endEvent = this.timeOutEvents.find(function (e) {
    return e.date === targetDate;
  });

  return (endEvent.hour - startEvent.hour) / 100;
};

let wagesEarnedOnDate = function (targetDate) {
  return parseInt(
    hoursWorkedOnDate.call(this, targetDate) * this.payPerHour,
    10
  );
};
/* previous code was: 
let wagesEarnedOnDate = function (employee, targetDate) {
  return parseInt(
    hoursWorkedOnDate(employee, targetDate) * employee.payPerHour,
    10
  );
}; 
In order to use the this argument, have to use call() method on hoursWorkedOnDate
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!
  //because of the accumulator parameter => this will be the context for each accumulation?

  return payable;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find(function (rec) {
    return rec.firstName === firstName;
  });
};

function calculatePayroll(allEmployeeRecords) {
  return allEmployeeRecords.reduce(function (accumulator, record) {
    return accumulator + allWagesFor.call(record);
  }, 0);
}
