const assert = require('assert');
const Command = require('../command.js');
const Message = require('../message.js');
const Rover = require('../rover.js');

describe("Rover class", function() {
// Test 7
  it("should have constructor set position and default values for mode and generatorWatts", function() {
    let rover = new Rover(10000);
    assert.strictEqual(rover.position, 10000);
    assert.strictEqual(rover.mode, 'NORMAL');
    assert.strictEqual(rover.generatorWatts, 110);
  });

// Test 8
it("should have response returned by receiveMessage contains name of message", function() {
  let commandsArray = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message("NAME", commandsArray);
  let rover = new Rover(10000);
  let response = rover.receiveMessage(message);
  assert.strictEqual(response.message, "NAME");
  });

//Test 9
  it("should have response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commandsArray = [new Command('MOVE', 12000), new Command('MOVE', 10000)];
    let message = new Message("NAME", commandsArray);
    let rover = new Rover(10000);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results.length, 2);
  });

//Test 10
  it("should respond correctly to status check command", function() {
    let rover = new Rover(10000);
    let commandsArray = [new Command('STATUS_CHECK')];
    let message = new Message("NAME", commandsArray);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[1].mode, 'NORMAL');
    assert.strictEqual(response.results[1].generatorWatts, 110);
    assert.strictEqual(response.results[1].position, 10000);
  });


//Test 11
  it("should respond correctly to mode change command", function() {
    let rover = new Rover(10000);
    let commandsArray = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message("NAME", commandsArray);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[0].completed, true);
    assert.strictEqual(response.results[1].mode, 'LOW_POWER');
  });

//Test 12
  it("should respond with false completed value when attempting to move in LOW_POWER mode", function() {
    let commandsArray = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command ('MOVE', 12000)];
    let message = new Message("NAME", commandsArray);
    let rover = new Rover(10000);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[2].completed, false);
  });

// Test 13
  it("should respond with position for move command", function(){
    let commandsArray = [new Command('MOVE', 10000)];
    let message = new Message("NAME", commandsArray);
    let rover = new Rover(10000);
    let response = rover.receiveMessage(message);
    assert.strictEqual(rover.position, 10000);
  });
  
});