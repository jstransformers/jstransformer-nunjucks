module.exports = {
  "filters": {
    "replaceMsWithF": function(input) {
      return input.replace(/m/g, "f");
    },
    "replaceMsWithQ": "./test/filters/replaceMsWithQ.js"
  }
};
