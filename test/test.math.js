var assert = require('assert');
var math = require('../math');

describe('math.multiply()', function() {
  const tests = [
    {name: "Positive Numbers", args: [2, 3], expected: 6},
    {name: "Negative Number", args: [2, -3], expected: -6},
    {name: "Negative Numbers", args: [-2, -3], expected: 6},
    {name: "Null", args: [0, 3], expected: 0},
  ];

  tests.forEach(({name, args, expected}) => {
    it(`Testing ${name}`, function() {
      const res = math.multiply(args);
      assert.strictEqual(res, expected);
    });
  });

});