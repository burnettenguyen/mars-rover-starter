const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {
// Test 1
  it("should throw error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

//Test 2
  it("should have constructor set command type", function() {
    let command = new Command('MOVE').commandType;
    let response = 'MOVE';
    assert.strictEqual(command, response);
  });

//Test 3
  it("should have constructor set Value if a 2nd argument is passed in", function () {
    let command = new Command('MOVE', 10000);
    let value = command.value;
    assert.strictEqual(value, 10000);
  });

});

