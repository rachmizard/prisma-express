const moment = require("moment");

const oprs = [
  "equals",
  "gt",
  "gte",
  "in",
  "lt",
  "lte",
  "not",
  "notIn",
  "contains",
];

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function isBool(str) {
  return str === "true" || str === "false";
}

function generateValue(value, opr = "") {
  if (isNumeric(value)) {
    return Number(value);
  } else if (isBool(value)) {
    return value === "true" ? true : false;
  } else {
    return value;
  }
}

const queryGenerator = (filterString = "") => {
  if (filterString === "") return {};

  let outputQuery = {};
  let appendFilter = {};
  let currentFilters = [];
  let split = filterString.split(", ");

  for (let idx = 0; idx < split.length; idx++) {
    const filterSplit = split[idx];

    if (split.length > 0) {
      const splitFilters = filterSplit.split(" ");
      let getFilterValue = "";

      const getFilterKey = splitFilters[0];
      const getFilterOpr = splitFilters[1];

      if (getFilterOpr === "in" || getFilterOpr === "notIn") {
        getFilterValue = filterSplit
          .match(/(?:"[^"]*"|^[^"]*$)/)[0]
          .replace(/"/g, "")
          .split(",")
          .map((item) => {
            return generateValue(item);
          });
      } else {
        getFilterValue = filterSplit
          .match(/(?:"[^"]*"|^[^"]*$)/)[0]
          .replace(/"/g, "");
      }

      currentFilters.push({
        key: getFilterKey,
        opr: getFilterOpr,
        value: generateValue(getFilterValue),
      });
    }
  }

  for (const obj of currentFilters) {
    if (oprs.includes(obj.opr)) {
      appendFilter[obj.key] = {
        [obj.opr]: obj.value,
      };
    }
  }

  outputQuery = appendFilter;
  return outputQuery;
};

const generateOrderBy = (orderByString = "") => {
  if (orderByString === "") return {};

  let outputQuery = {};
  let appendOrderBy = {};
  let currentOrderBy = [];
  let split = orderByString.split(", ");

  for (let idx = 0; idx < split.length; idx++) {
    const orderBySplit = split[idx];

    if (split.length > 0) {
      const splitOrderBy = orderBySplit.split(":");
      const getOrderByKey = splitOrderBy[0];
      const getOrderByValue = splitOrderBy[1];

      currentOrderBy.push({
        key: getOrderByKey,
        value: getOrderByValue,
      });
    }
  }

  for (const obj of currentOrderBy) {
    appendOrderBy[obj.key] = obj.value;
  }

  outputQuery = appendOrderBy;
  return outputQuery;
};

module.exports = { queryGenerator, generateOrderBy };
