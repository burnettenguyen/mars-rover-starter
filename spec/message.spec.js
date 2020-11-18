const assert = require('assert');
const Command = require('../command.js');
const Message = require('../message.js');

describe("Message class", function() {
// Test 4
  it("should throw error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: "Name required."
      }
    );
  });

// Test 5
  it("should have the constructor set name", function() {
    let messageName = new Message('NAME').name;
    let response = 'NAME';
    assert.strictEqual(messageName, 'NAME');
  });

// Test 6
  it("should contain a commands array passed into the constructor as 2nd argument", function() {
    let commandsArray = [new Command('MOVE', 'MODE_CHANGE'), new Command('STATUS_CHECK')];
    let response = new Message('NAME', commandsArray);
    assert.strictEqual(response.commands, commandsArray);
  });

});